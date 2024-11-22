declare module 'react-pageflip' {
    import { Component } from 'react';

    interface IProps {
        width: number;
        height: number;
        className?: string;
        style?: React.CSSProperties;
        maxHeight?: number;
        maxWidth?: number;
        showCover?: boolean; 
        children: React.ReactNode;
        onFlip?: (e: { data: number }) => void;
    }

    export default class HTMLFlipBook extends Component<IProps> {
        pageFlip() {
            throw new Error('Method not implemented.');
        }
        flipNext(corner?: ['top', 'bottom']): void;
        flipPrev(corner?: ['top', 'bottom']): void;
    }
}
