import * as Blockly from 'blockly/core';
import 'blockly/blocks';
import { pythonGenerator } from 'blockly/python';
import { describe, expect, it } from 'vitest';
import '@components/blockly/xrp_blocks';
import '@components/blockly/xrp_blocks_python';

function generate(type: string, input: string, value: number): string {
    const ws = new Blockly.Workspace();
    try {
        Blockly.serialization.blocks.append(
            {
                type,
                inputs: { [input]: { shadow: { type: 'math_number', fields: { NUM: value } } } },
            },
            ws,
        );
        return pythonGenerator.workspaceToCode(ws);
    } finally {
        ws.dispose();
    }
}

describe('kids movement blocks', () => {
    it('sets up the drivetrain', () => {
        const code = generate('xrp_kids_move_forward', 'inches', 12);
        expect(code).toContain('from XRPLib.differential_drive import DifferentialDrive');
        expect(code).toContain(
            'differentialDrive = DifferentialDrive.get_default_differential_drive()',
        );
    });

    it('forward converts inches to cm', () => {
        expect(generate('xrp_kids_move_forward', 'inches', 12)).toContain(
            'differentialDrive.straight(abs(12) * 2.54)\n',
        );
    });

    it('backward is negative', () => {
        expect(generate('xrp_kids_move_backward', 'inches', 12)).toContain(
            'differentialDrive.straight(-abs(12) * 2.54)\n',
        );
    });

    // in XRPLib positive = counterclockwise = left
    it('left is a positive angle', () => {
        expect(generate('xrp_kids_turn_left', 'degrees', 90)).toContain(
            'differentialDrive.turn(abs(90))\n',
        );
    });

    it('right is a negative angle', () => {
        expect(generate('xrp_kids_turn_right', 'degrees', 90)).toContain(
            'differentialDrive.turn(-abs(90))\n',
        );
    });

    it('negative numbers still go the right way', () => {
        expect(generate('xrp_kids_turn_left', 'degrees', -90)).toContain(
            'differentialDrive.turn(abs((-90)))\n',
        );
        expect(generate('xrp_kids_move_forward', 'inches', -6)).toContain(
            'differentialDrive.straight(abs((-6)) * 2.54)\n',
        );
    });
});
