import { NaturalToJsonListener } from "../generated/NaturalToJsonListener";
import { ParserRuleContext } from "antlr4ts";
import { TerminalNode } from "antlr4ts/tree/TerminalNode";
import { ErrorNode } from "antlr4ts/tree/ErrorNode";

export interface TreeNode {
    name: string;
    type: 'rule' | 'terminal' | 'error';
    children?: TreeNode[];
    text?: string;
}

export class ParseTreeBuilderListener implements NaturalToJsonListener {
    private stack: TreeNode[] = [];
    private result: TreeNode | null = null;

    getResult(): TreeNode | null {
        return this.result;
    }

    enterEveryRule(ctx: ParserRuleContext) {
        const node: TreeNode = {
            name: ctx.constructor.name.replace('Context', ''),
            type: 'rule',
            children: []
        };

        if (this.stack.length > 0) {
            this.stack[this.stack.length - 1].children?.push(node);
        } else {
            this.result = node;
        }
        this.stack.push(node);
    }

    exitEveryRule(ctx: ParserRuleContext) {
        this.stack.pop();
    }

    visitTerminal(node: TerminalNode) {
        if (this.stack.length > 0) {
            const parent = this.stack[this.stack.length - 1];
            // Ignore EOF
            if (node.symbol.type === -1) return;

            parent.children?.push({
                name: 'TOKEN',
                type: 'terminal',
                text: node.text
            });
        }
    }

    visitErrorNode(node: ErrorNode) {
        if (this.stack.length > 0) {
            const parent = this.stack[this.stack.length - 1];
            parent.children?.push({
                name: 'ERROR',
                type: 'error',
                text: node.text
            });
        }
    }
}
