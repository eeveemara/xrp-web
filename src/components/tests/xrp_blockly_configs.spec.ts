import { describe, expect, it } from 'vitest';
import BlocklyConfigs, { XRP_KIDS_MODE } from '@components/blockly/xrp_blockly_configs';

type ToolboxItem = { kind: string; categoryId?: string; contents?: { type?: string }[] };

describe('xrp_blockly_configs', () => {
    it('full toolbox loads', () => {
        const ids = (BlocklyConfigs.ToolboxJson.contents as ToolboxItem[]).map((c) => c.categoryId);
        expect(ids).toContain('driveTrain');
        expect(ids).toContain('gamepad');
    });

    it('kids mode shows the kids toolbox', () => {
        const contents = BlocklyConfigs.getLocalizedToolboxJson().contents as ToolboxItem[];
        const ids = contents.map((c) => c.categoryId);
        if (!XRP_KIDS_MODE) {
            expect(ids).toContain('driveTrain');
            return;
        }
        expect(ids).toEqual(['kidsMovement', 'loops', 'kidsControl']);
        expect(contents[0]!.contents!.map((b) => b.type)).toEqual([
            'xrp_kids_move_forward',
            'xrp_kids_move_backward',
            'xrp_kids_turn_left',
            'xrp_kids_turn_right',
        ]);
    });
});
