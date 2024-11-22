

import React from "react";
import styles from "./BlobButton.module.css";

interface BlobButtonProps {
    children: React.ReactNode;
}

const BlobButton: React.FC<BlobButtonProps> = ({ children }) => {
    return (
        <div className={styles.buttons}>
            <button className={styles.blobBtn}>
                {children}
                <span className={styles.blobBtnInner}>
                    <span className={styles.blobBtnBlobs}>
                        <span className={styles.blobBtnBlob}></span>
                        <span className={styles.blobBtnBlob}></span>
                        <span className={styles.blobBtnBlob}></span>
                        <span className={styles.blobBtnBlob}></span>
                    </span>
                </span>
            </button>
            <svg xmlns="http://www.w3.org/2000/svg" version="1.1" style={{ display: 'none' }}>
                <defs>
                    <filter id="goo">
                        <feGaussianBlur in="SourceGraphic" result="blur" stdDeviation="10"></feGaussianBlur>
                        <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 21 -7" result="goo"></feColorMatrix>
                        <feBlend in2="goo" in="SourceGraphic" result="mix"></feBlend>
                    </filter>   
                </defs>
            </svg>
        </div>
    );
};

export default BlobButton;
