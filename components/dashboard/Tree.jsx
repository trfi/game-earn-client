import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

const Tree = ({ data = [] }) => {
  return (
    <div className="d-tree">
      <ul className="flex d-tree-container flex-col">
        {data.map((tree, idx) => (
          <TreeNode node={tree} key={idx} />
        ))}
      </ul>
    </div>
  );
};

const TreeNode = ({ node }) => {
  const [childVisible, setChildVisiblity] = useState(false);

  const hasChild = node.children.length ? true : false;
  return (
    <li className="pl-6 lg:pl-12 border-0 text-white">
      <div className="flex my-3" onClick={(e) => setChildVisiblity((v) => !v)}>
        {hasChild ? 
          <div
            className={`inline d-tree-toggler ${
              childVisible ? "active" : ""
            }`}
          >
            <FontAwesomeIcon icon="fa-caret-right" />
          </div>
        : <div className="mr-2"></div>}

        <div className="basis-0 grow max-w-full px-3 space-x-2">
          {/* <i className={`mr-1 ${node.icon}`}> </i> */}
          <FontAwesomeIcon icon="fa-user" />
          <span>{node.username}</span>
        </div>
      </div>

      {hasChild && childVisible && (
        <div className="list-none p-0">
          <ul className="flex d-tree-container flex-col">
            <Tree data={node.children} />
          </ul>
        </div>
      )}
    </li>
  );
};

export default Tree;