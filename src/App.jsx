import {useState} from 'react';

import treeDataExample from './data.json';
import CollapsibleTree from './components/CollapsibleTree.component.jsx';

function App() {
    const [nodes] = useState(treeDataExample);
    return <CollapsibleTree nodes={nodes}></CollapsibleTree>;
}

export default App
