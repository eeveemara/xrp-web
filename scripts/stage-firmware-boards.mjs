// downloads the firmware files (micropython + XRPLib) from Open-STEM/XRP_Firmware
// and puts them in public/firmware-loader/boards.
// that folder is gitignored so it's empty after you clone. run this once or the
// firmware loader won't work.
//
// npm run stage:firmware            gets the latest release
// npm run stage:firmware -- v2.0.7  gets a specific tag or branch

import { execFileSync } from 'child_process';
import { promises as fs } from 'fs';
import os from 'os';
import path from 'path';
import { fileURLToPath } from 'url';

const REPO = 'Open-STEM/XRP_Firmware';
const REPO_URL = `https://github.com/${REPO}.git`;

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const TARGET = path.resolve(__dirname, '..', 'public', 'firmware-loader', 'boards');

function git(args, options = {}) {
    return execFileSync('git', args, { encoding: 'utf8', ...options });
}

async function latestReleaseTag() {
    try {
        const res = await fetch(`https://api.github.com/repos/${REPO}/releases/latest`, {
            headers: { Accept: 'application/vnd.github+json' },
        });
        if (res.ok) {
            const tag = (await res.json()).tag_name;
            if (typeof tag === 'string' && tag) return tag;
        }
    } catch {
        // didn't work, use the tags instead
    }
    // github only allows 60 api requests an hour if you're not logged in and school
    // wifi can run out. the newest tag is the same thing anyway.
    const tags = git(['ls-remote', '--tags', '--refs', '--sort=-v:refname', REPO_URL])
        .split('\n')
        .map((line) => line.split('refs/tags/')[1])
        .filter(Boolean);
    if (tags.length === 0) {
        throw new Error(`no tags found in ${REPO_URL}`);
    }
    return tags[0];
}

async function main() {
    const ref = process.argv[2] || process.env.XRP_FIRMWARE_REF || (await latestReleaseTag());
    console.log(`firmware-loader: staging ${REPO} ${ref}`);

    const tmp = await fs.mkdtemp(path.join(os.tmpdir(), 'xrp-firmware-'));
    try {
        // turn off autocrlf so windows doesn't change the line endings, these go on the robot
        const config = ['-c', 'advice.detachedHead=false', '-c', 'core.autocrlf=false'];
        git([...config, 'clone', '--quiet', '--depth', '1', '--branch', ref, REPO_URL, tmp], {
            stdio: ['ignore', 'ignore', 'inherit'],
        });
        const source = path.join(tmp, 'boards');
        await fs.access(source);
        await fs.rm(TARGET, { recursive: true, force: true });
        await fs.cp(source, TARGET, { recursive: true });
    } finally {
        await fs.rm(tmp, { recursive: true, force: true });
    }
    console.log(`firmware-loader: staged into ${path.relative(process.cwd(), TARGET)}`);

    // the site can't list folders so each XRPLib release needs a files.json
    execFileSync(process.execPath, [path.join(__dirname, 'gen-firmware-manifests.mjs')], {
        stdio: 'inherit',
    });
}

main().catch((e) => {
    console.error('stage-firmware-boards failed:', e.message ?? e);
    console.error(`check your internet, or download ${REPO_URL.replace('.git', '')}`);
    console.error('and copy the boards folder into public/firmware-loader/boards yourself.');
    process.exit(1);
});
