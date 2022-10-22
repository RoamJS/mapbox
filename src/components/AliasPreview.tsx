import { Tooltip } from "@blueprintjs/core";
import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import getPageTitleByPageUid from "roamjs-components/queries/getPageTitleByPageUid";
import getTextByBlockUid from "roamjs-components/queries/getTextByBlockUid";
import { getParseInline } from "roamjs-components/marked";
import getPageUidByPageTitle from "roamjs-components/queries/getPageUidByPageTitle";
import getRoamUrl from "roamjs-components/dom/getRoamUrl";
import getPageTitleByBlockUid from "roamjs-components/queries/getPageTitleByBlockUid";

export const getParseRoamMarked = (): Promise<(s: string) => string> =>
  getParseInline().then(
    (parseInline) => (text: string) => parseInline(text, context)
  );

const context = {
  pagesToHrefs: (page: string, ref?: string) =>
    ref ? getRoamUrl(ref) : getRoamUrl(getPageUidByPageTitle(page)),
  blockReferences: (ref: string) => ({
    text: getTextByBlockUid(ref),
    page: getPageTitleByBlockUid(ref),
  }),
  components: (): false => {
    return false;
  },
};

const AliasPreview: React.FunctionComponent<{ blockUid: string }> = ({
  blockUid,
  children,
}) => {
  const [html, setHtml] = useState("");
  useEffect(() => {
    const title = getPageTitleByPageUid(blockUid);
    if (title) {
      setHtml(`<span data-link-title="${title}" data-link-uid="${blockUid}">
  <span class="rm-page-ref__brackets">[[</span>
  <span tabindex="-1" class="rm-page-ref rm-page-ref--link">${title}</span>
  <span class="rm-page-ref__brackets">]]</span>
</span>`);
    }
    getParseRoamMarked().then((p) => setHtml(p(getTextByBlockUid(blockUid))));
  }, [blockUid, setHtml]);
  return (
    <Tooltip content={<div dangerouslySetInnerHTML={{ __html: html }} />}>
      {children}
    </Tooltip>
  );
};

export const render = ({
  p,
  blockUid,
  children,
}: {
  p: HTMLElement;
  blockUid: string;
  children: React.ReactNode;
}): void =>
  ReactDOM.render(
    <AliasPreview blockUid={blockUid}>{children}</AliasPreview>,
    p
  );

export default AliasPreview;
