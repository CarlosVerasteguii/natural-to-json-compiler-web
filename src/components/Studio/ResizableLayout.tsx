"use client";

import React from 'react';
import { Panel, PanelGroup, PanelResizeHandle } from 'react-resizable-panels';
import { GripVertical } from 'lucide-react';

interface ResizableLayoutProps {
    left: React.ReactNode;
    right: React.ReactNode;
}

const ResizableLayout = ({ left, right }: ResizableLayoutProps) => {
    return (
        <PanelGroup direction="horizontal" className="h-full">
            <Panel defaultSize={50} minSize={30}>
                <div className="h-full p-6 pr-2">
                    {left}
                </div>
            </Panel>

            <PanelResizeHandle className="w-4 flex items-center justify-center hover:bg-slate-800/50 transition-colors cursor-col-resize group">
                <div className="w-1 h-8 bg-slate-700 rounded-full group-hover:bg-blue-500 transition-colors flex items-center justify-center">
                    <GripVertical className="w-3 h-3 text-slate-900 opacity-0 group-hover:opacity-100" />
                </div>
            </PanelResizeHandle>

            <Panel defaultSize={50} minSize={30}>
                <div className="h-full p-6 pl-2">
                    {right}
                </div>
            </Panel>
        </PanelGroup>
    );
};

export default ResizableLayout;
