import directoryTree, { DirectoryTree } from "directory-tree"; // Import the DirectoryTree type

process.on("message", (message: any) => {
  const directoryPath = message.dir;
  const originalTree = directoryTree(directoryPath);
  const filteredTree = filterTree(originalTree);
  process.send?.(filteredTree)
});

const excludeDirs = ["node_modules", ".git"];

interface TreeNode {
  name: string;
  isFile: boolean;
  children?: TreeNode[];
}

function filterTree(tree: DirectoryTree): TreeNode { // Use DirectoryTree type
  const filtered: TreeNode = {
    name: tree.name,
    isFile: tree.type === 'file',
  };

  if (tree.children) {
    filtered.children = tree.children
      .filter((child) => !excludeDirs.includes(child.name))
      .map((child) => filterTree(child));
  }

  return filtered;
}
