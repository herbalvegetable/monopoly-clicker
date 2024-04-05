import { useState, useEffect, useRef } from 'react';

import styles from './BoardSquare.module.css';

export default function BoardSquare(props) {

    return (
        <div className={`${styles.main} ${styles[props.type]}`}>
            {
                props.type === 'property' ?

                <>
                    <div className={styles.header} style={{backgroundColor: props.fill}}></div>
                    <div className={styles.content}>
                        <div className={styles.title}>{props.title}</div>
                        <div className={styles.cost}>{props.cost}M</div>
                    </div>
                </>

                : props.type === 'tax' ?

                <>
                    <div className={styles.title}>{props.title}</div>
                    <div className={styles.cost}>{props.cost}M</div>
                </>

                : props.type === 'chance' ?

                <>
                    <div className={styles.title}>Chance</div>
                </>

                : props.type === 'go' ?

                <>
                    <div className={styles.title}>GO</div>
                </>

                :

                null
            }
        </div>
    )
}