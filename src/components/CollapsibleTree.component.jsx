import React, {useReducer} from 'react'

import styles from './CollapsibleTree.module.scss'

function reducer(state, action) {
    switch (action.type) {
        case 'toggle':
            return {...state, [action.payload]: !state[action.payload] ?? false}
        default:
            throw new Error()
    }
}

const CollapsibleTree = ({nodes}) => {
    const [state, dispatch] = useReducer(reducer, {})

    return (
        <ul className={styles.node}>
            {Array.isArray(nodes) ? nodes.map(node => (
                <li key={node.id}
                    className={[
                        node.type,
                        node.type === 'Group' ? (state[node.id] ? 'opened' : 'closed') : ''
                    ].join(' ').trim()}
                    onClick={(e) => {
                        dispatch({type: 'toggle', payload: node.id})
                        e.stopPropagation()
                    }}>
                    <span className="label">
                        {node.type === 'Group' ? <>{state[node.id] ? '-' : '+'}&nbsp;</> : <></>}
                        {node.name}
                    </span>
                    {node.type === 'Group' && state[node.id] && Array.isArray(node.contacts) ? (
                        <CollapsibleTree nodes={node.contacts}/>
                    ) : <></>}
                </li>
            )) : <></>}
        </ul>
    )
}

export default CollapsibleTree
