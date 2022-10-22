import { useMemo } from "react";
import getUidsFromId from "roamjs-components/dom/getUidsFromId";
import getFullTreeByParentUid from "roamjs-components/queries/getFullTreeByParentUid";
import { TreeNode } from "roamjs-components/types";

export const getTreeByHtmlId = (
  blockId: string
): { children: TreeNode[]; text: string } => {
  const { blockUid } = getUidsFromId(blockId);
  return getFullTreeByParentUid(blockUid);
};

export const useTreeByHtmlId = (
  blockId: string
): { children: TreeNode[]; text: string } =>
  useMemo(() => getTreeByHtmlId(blockId), [blockId]);
