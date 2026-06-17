var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
var _a, _b;
import React, { Component, useState, useEffect, useRef, useCallback, useMemo, createContext, useContext } from "react";
import ReactDOMServer from "react-dom/server";
import { useLocation, Link, useParams, useNavigate, Routes, Route, Navigate, StaticRouter } from "react-router-dom";
import fastCompare from "react-fast-compare";
import invariant from "invariant";
import shallowEqual from "shallowequal";
import { jsxs, jsx, Fragment } from "react/jsx-runtime";
import { Phone, Mail, Home as Home$1, CalendarCheck, MapPin, TrainFront, Users, BookOpen, ArrowRight, X, Menu, Facebook, Twitter, Linkedin, Car, Shield, Clock, Star, CheckCircle, AlertCircle, User, Gauge, Timer, Calendar, Armchair, RefreshCw, ClipboardList, FileText, MessageSquare, ChevronUp, ChevronDown, Building2, CircleDot, BadgeCheck, Plane, Euro, Brain as Train, Award, Heart, ArrowLeft, Share2, Send, Stethoscope, HelpCircle, ShieldCheck, Activity, Brain, Luggage, Lock, LogIn, LayoutDashboard, Settings as Settings$1, LogOut, Eye, Trash2, XCircle, Plus, EyeOff, CreditCard as Edit, Undo, Redo, Heading2, Heading3, Bold, Italic, Underline, List, ListOrdered, Quote, AlignLeft, AlignCenter, AlignRight, Link as Link$1, Code, Image as Image$1, Search, Upload, Check, Info, MoveUp, MoveDown, Save, Copy, Globe, BarChart, ChevronLeft, ChevronRight, Grid2x2 as Grid, CheckSquare, Square, ExternalLink, TrendingUp, BarChart3, ArrowUp, ArrowDown, CreditCard as Edit2, MessageCircle } from "lucide-react";
import { createClient } from "@supabase/supabase-js";
import { createPortal } from "react-dom";
var TAG_NAMES = /* @__PURE__ */ ((TAG_NAMES2) => {
  TAG_NAMES2["BASE"] = "base";
  TAG_NAMES2["BODY"] = "body";
  TAG_NAMES2["HEAD"] = "head";
  TAG_NAMES2["HTML"] = "html";
  TAG_NAMES2["LINK"] = "link";
  TAG_NAMES2["META"] = "meta";
  TAG_NAMES2["NOSCRIPT"] = "noscript";
  TAG_NAMES2["SCRIPT"] = "script";
  TAG_NAMES2["STYLE"] = "style";
  TAG_NAMES2["TITLE"] = "title";
  TAG_NAMES2["FRAGMENT"] = "Symbol(react.fragment)";
  return TAG_NAMES2;
})(TAG_NAMES || {});
var SEO_PRIORITY_TAGS = {
  link: { rel: ["amphtml", "canonical", "alternate"] },
  script: { type: ["application/ld+json"] },
  meta: {
    charset: "",
    name: ["generator", "robots", "description"],
    property: [
      "og:type",
      "og:title",
      "og:url",
      "og:image",
      "og:image:alt",
      "og:description",
      "twitter:url",
      "twitter:title",
      "twitter:description",
      "twitter:image",
      "twitter:image:alt",
      "twitter:card",
      "twitter:site"
    ]
  }
};
var VALID_TAG_NAMES = Object.values(TAG_NAMES);
var REACT_TAG_MAP = {
  accesskey: "accessKey",
  charset: "charSet",
  class: "className",
  contenteditable: "contentEditable",
  contextmenu: "contextMenu",
  "http-equiv": "httpEquiv",
  itemprop: "itemProp",
  tabindex: "tabIndex"
};
var HTML_TAG_MAP = Object.entries(REACT_TAG_MAP).reduce(
  (carry, [key, value]) => {
    carry[value] = key;
    return carry;
  },
  {}
);
var HELMET_ATTRIBUTE = "data-rh";
var HELMET_PROPS = {
  DEFAULT_TITLE: "defaultTitle",
  DEFER: "defer",
  ENCODE_SPECIAL_CHARACTERS: "encodeSpecialCharacters",
  ON_CHANGE_CLIENT_STATE: "onChangeClientState",
  TITLE_TEMPLATE: "titleTemplate",
  PRIORITIZE_SEO_TAGS: "prioritizeSeoTags"
};
var getInnermostProperty = (propsList, property) => {
  for (let i = propsList.length - 1; i >= 0; i -= 1) {
    const props = propsList[i];
    if (Object.prototype.hasOwnProperty.call(props, property)) {
      return props[property];
    }
  }
  return null;
};
var getTitleFromPropsList = (propsList) => {
  let innermostTitle = getInnermostProperty(
    propsList,
    "title"
    /* TITLE */
  );
  const innermostTemplate = getInnermostProperty(propsList, HELMET_PROPS.TITLE_TEMPLATE);
  if (Array.isArray(innermostTitle)) {
    innermostTitle = innermostTitle.join("");
  }
  if (innermostTemplate && innermostTitle) {
    return innermostTemplate.replace(/%s/g, () => innermostTitle);
  }
  const innermostDefaultTitle = getInnermostProperty(propsList, HELMET_PROPS.DEFAULT_TITLE);
  return innermostTitle || innermostDefaultTitle || void 0;
};
var getOnChangeClientState = (propsList) => getInnermostProperty(propsList, HELMET_PROPS.ON_CHANGE_CLIENT_STATE) || (() => {
});
var getAttributesFromPropsList = (tagType, propsList) => propsList.filter((props) => typeof props[tagType] !== "undefined").map((props) => props[tagType]).reduce((tagAttrs, current) => ({ ...tagAttrs, ...current }), {});
var getBaseTagFromPropsList = (primaryAttributes, propsList) => propsList.filter((props) => typeof props[
  "base"
  /* BASE */
] !== "undefined").map((props) => props[
  "base"
  /* BASE */
]).reverse().reduce((innermostBaseTag, tag) => {
  if (!innermostBaseTag.length) {
    const keys = Object.keys(tag);
    for (let i = 0; i < keys.length; i += 1) {
      const attributeKey = keys[i];
      const lowerCaseAttributeKey = attributeKey.toLowerCase();
      if (primaryAttributes.indexOf(lowerCaseAttributeKey) !== -1 && tag[lowerCaseAttributeKey]) {
        return innermostBaseTag.concat(tag);
      }
    }
  }
  return innermostBaseTag;
}, []);
var warn = (msg) => console && typeof console.warn === "function" && console.warn(msg);
var getTagsFromPropsList = (tagName, primaryAttributes, propsList) => {
  const approvedSeenTags = {};
  return propsList.filter((props) => {
    if (Array.isArray(props[tagName])) {
      return true;
    }
    if (typeof props[tagName] !== "undefined") {
      warn(
        `Helmet: ${tagName} should be of type "Array". Instead found type "${typeof props[tagName]}"`
      );
    }
    return false;
  }).map((props) => props[tagName]).reverse().reduce((approvedTags, instanceTags) => {
    const instanceSeenTags = {};
    instanceTags.filter((tag) => {
      let primaryAttributeKey;
      const keys2 = Object.keys(tag);
      for (let i = 0; i < keys2.length; i += 1) {
        const attributeKey = keys2[i];
        const lowerCaseAttributeKey = attributeKey.toLowerCase();
        if (primaryAttributes.indexOf(lowerCaseAttributeKey) !== -1 && !(primaryAttributeKey === "rel" && tag[primaryAttributeKey].toLowerCase() === "canonical") && !(lowerCaseAttributeKey === "rel" && tag[lowerCaseAttributeKey].toLowerCase() === "stylesheet")) {
          primaryAttributeKey = lowerCaseAttributeKey;
        }
        if (primaryAttributes.indexOf(attributeKey) !== -1 && (attributeKey === "innerHTML" || attributeKey === "cssText" || attributeKey === "itemprop")) {
          primaryAttributeKey = attributeKey;
        }
      }
      if (!primaryAttributeKey || !tag[primaryAttributeKey]) {
        return false;
      }
      const value = tag[primaryAttributeKey].toLowerCase();
      if (!approvedSeenTags[primaryAttributeKey]) {
        approvedSeenTags[primaryAttributeKey] = {};
      }
      if (!instanceSeenTags[primaryAttributeKey]) {
        instanceSeenTags[primaryAttributeKey] = {};
      }
      if (!approvedSeenTags[primaryAttributeKey][value]) {
        instanceSeenTags[primaryAttributeKey][value] = true;
        return true;
      }
      return false;
    }).reverse().forEach((tag) => approvedTags.push(tag));
    const keys = Object.keys(instanceSeenTags);
    for (let i = 0; i < keys.length; i += 1) {
      const attributeKey = keys[i];
      const tagUnion = {
        ...approvedSeenTags[attributeKey],
        ...instanceSeenTags[attributeKey]
      };
      approvedSeenTags[attributeKey] = tagUnion;
    }
    return approvedTags;
  }, []).reverse();
};
var getAnyTrueFromPropsList = (propsList, checkedTag) => {
  if (Array.isArray(propsList) && propsList.length) {
    for (let index = 0; index < propsList.length; index += 1) {
      const prop = propsList[index];
      if (prop[checkedTag]) {
        return true;
      }
    }
  }
  return false;
};
var reducePropsToState = (propsList) => ({
  baseTag: getBaseTagFromPropsList([
    "href"
    /* HREF */
  ], propsList),
  bodyAttributes: getAttributesFromPropsList("bodyAttributes", propsList),
  defer: getInnermostProperty(propsList, HELMET_PROPS.DEFER),
  encode: getInnermostProperty(propsList, HELMET_PROPS.ENCODE_SPECIAL_CHARACTERS),
  htmlAttributes: getAttributesFromPropsList("htmlAttributes", propsList),
  linkTags: getTagsFromPropsList(
    "link",
    [
      "rel",
      "href"
      /* HREF */
    ],
    propsList
  ),
  metaTags: getTagsFromPropsList(
    "meta",
    [
      "name",
      "charset",
      "http-equiv",
      "property",
      "itemprop"
      /* ITEM_PROP */
    ],
    propsList
  ),
  noscriptTags: getTagsFromPropsList("noscript", [
    "innerHTML"
    /* INNER_HTML */
  ], propsList),
  onChangeClientState: getOnChangeClientState(propsList),
  scriptTags: getTagsFromPropsList(
    "script",
    [
      "src",
      "innerHTML"
      /* INNER_HTML */
    ],
    propsList
  ),
  styleTags: getTagsFromPropsList("style", [
    "cssText"
    /* CSS_TEXT */
  ], propsList),
  title: getTitleFromPropsList(propsList),
  titleAttributes: getAttributesFromPropsList("titleAttributes", propsList),
  prioritizeSeoTags: getAnyTrueFromPropsList(propsList, HELMET_PROPS.PRIORITIZE_SEO_TAGS)
});
var flattenArray = (possibleArray) => Array.isArray(possibleArray) ? possibleArray.join("") : possibleArray;
var checkIfPropsMatch = (props, toMatch) => {
  const keys = Object.keys(props);
  for (let i = 0; i < keys.length; i += 1) {
    if (toMatch[keys[i]] && toMatch[keys[i]].includes(props[keys[i]])) {
      return true;
    }
  }
  return false;
};
var prioritizer = (elementsList, propsToMatch) => {
  if (Array.isArray(elementsList)) {
    return elementsList.reduce(
      (acc, elementAttrs) => {
        if (checkIfPropsMatch(elementAttrs, propsToMatch)) {
          acc.priority.push(elementAttrs);
        } else {
          acc.default.push(elementAttrs);
        }
        return acc;
      },
      { priority: [], default: [] }
    );
  }
  return { default: elementsList, priority: [] };
};
var without = (obj, key) => {
  return {
    ...obj,
    [key]: void 0
  };
};
var SELF_CLOSING_TAGS = [
  "noscript",
  "script",
  "style"
  /* STYLE */
];
var encodeSpecialCharacters = (str, encode = true) => {
  if (encode === false) {
    return String(str);
  }
  return String(str).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#x27;");
};
var generateElementAttributesAsString = (attributes) => Object.keys(attributes).reduce((str, key) => {
  const attr = typeof attributes[key] !== "undefined" ? `${key}="${attributes[key]}"` : `${key}`;
  return str ? `${str} ${attr}` : attr;
}, "");
var generateTitleAsString = (type, title, attributes, encode) => {
  const attributeString = generateElementAttributesAsString(attributes);
  const flattenedTitle = flattenArray(title);
  return attributeString ? `<${type} ${HELMET_ATTRIBUTE}="true" ${attributeString}>${encodeSpecialCharacters(
    flattenedTitle,
    encode
  )}</${type}>` : `<${type} ${HELMET_ATTRIBUTE}="true">${encodeSpecialCharacters(
    flattenedTitle,
    encode
  )}</${type}>`;
};
var generateTagsAsString = (type, tags, encode = true) => tags.reduce((str, t) => {
  const tag = t;
  const attributeHtml = Object.keys(tag).filter(
    (attribute) => !(attribute === "innerHTML" || attribute === "cssText")
  ).reduce((string, attribute) => {
    const attr = typeof tag[attribute] === "undefined" ? attribute : `${attribute}="${encodeSpecialCharacters(tag[attribute], encode)}"`;
    return string ? `${string} ${attr}` : attr;
  }, "");
  const tagContent = tag.innerHTML || tag.cssText || "";
  const isSelfClosing = SELF_CLOSING_TAGS.indexOf(type) === -1;
  return `${str}<${type} ${HELMET_ATTRIBUTE}="true" ${attributeHtml}${isSelfClosing ? `/>` : `>${tagContent}</${type}>`}`;
}, "");
var convertElementAttributesToReactProps = (attributes, initProps = {}) => Object.keys(attributes).reduce((obj, key) => {
  const mapped = REACT_TAG_MAP[key];
  obj[mapped || key] = attributes[key];
  return obj;
}, initProps);
var generateTitleAsReactComponent = (_type, title, attributes) => {
  const initProps = {
    key: title,
    [HELMET_ATTRIBUTE]: true
  };
  const props = convertElementAttributesToReactProps(attributes, initProps);
  return [React.createElement("title", props, title)];
};
var generateTagsAsReactComponent = (type, tags) => tags.map((tag, i) => {
  const mappedTag = {
    key: i,
    [HELMET_ATTRIBUTE]: true
  };
  Object.keys(tag).forEach((attribute) => {
    const mapped = REACT_TAG_MAP[attribute];
    const mappedAttribute = mapped || attribute;
    if (mappedAttribute === "innerHTML" || mappedAttribute === "cssText") {
      const content = tag.innerHTML || tag.cssText;
      mappedTag.dangerouslySetInnerHTML = { __html: content };
    } else {
      mappedTag[mappedAttribute] = tag[attribute];
    }
  });
  return React.createElement(type, mappedTag);
});
var getMethodsForTag = (type, tags, encode = true) => {
  switch (type) {
    case "title":
      return {
        toComponent: () => generateTitleAsReactComponent(type, tags.title, tags.titleAttributes),
        toString: () => generateTitleAsString(type, tags.title, tags.titleAttributes, encode)
      };
    case "bodyAttributes":
    case "htmlAttributes":
      return {
        toComponent: () => convertElementAttributesToReactProps(tags),
        toString: () => generateElementAttributesAsString(tags)
      };
    default:
      return {
        toComponent: () => generateTagsAsReactComponent(type, tags),
        toString: () => generateTagsAsString(type, tags, encode)
      };
  }
};
var getPriorityMethods = ({ metaTags, linkTags, scriptTags, encode }) => {
  const meta = prioritizer(metaTags, SEO_PRIORITY_TAGS.meta);
  const link = prioritizer(linkTags, SEO_PRIORITY_TAGS.link);
  const script = prioritizer(scriptTags, SEO_PRIORITY_TAGS.script);
  const priorityMethods = {
    toComponent: () => [
      ...generateTagsAsReactComponent("meta", meta.priority),
      ...generateTagsAsReactComponent("link", link.priority),
      ...generateTagsAsReactComponent("script", script.priority)
    ],
    toString: () => (
      // generate all the tags as strings and concatenate them
      `${getMethodsForTag("meta", meta.priority, encode)} ${getMethodsForTag(
        "link",
        link.priority,
        encode
      )} ${getMethodsForTag("script", script.priority, encode)}`
    )
  };
  return {
    priorityMethods,
    metaTags: meta.default,
    linkTags: link.default,
    scriptTags: script.default
  };
};
var mapStateOnServer = (props) => {
  const {
    baseTag,
    bodyAttributes,
    encode = true,
    htmlAttributes,
    noscriptTags,
    styleTags,
    title = "",
    titleAttributes,
    prioritizeSeoTags
  } = props;
  let { linkTags, metaTags, scriptTags } = props;
  let priorityMethods = {
    toComponent: () => {
    },
    toString: () => ""
  };
  if (prioritizeSeoTags) {
    ({ priorityMethods, linkTags, metaTags, scriptTags } = getPriorityMethods(props));
  }
  return {
    priority: priorityMethods,
    base: getMethodsForTag("base", baseTag, encode),
    bodyAttributes: getMethodsForTag("bodyAttributes", bodyAttributes, encode),
    htmlAttributes: getMethodsForTag("htmlAttributes", htmlAttributes, encode),
    link: getMethodsForTag("link", linkTags, encode),
    meta: getMethodsForTag("meta", metaTags, encode),
    noscript: getMethodsForTag("noscript", noscriptTags, encode),
    script: getMethodsForTag("script", scriptTags, encode),
    style: getMethodsForTag("style", styleTags, encode),
    title: getMethodsForTag("title", { title, titleAttributes }, encode)
  };
};
var server_default = mapStateOnServer;
var instances = [];
var isDocument = !!(typeof window !== "undefined" && window.document && window.document.createElement);
var HelmetData = class {
  constructor(context, canUseDOM) {
    __publicField(this, "instances", []);
    __publicField(this, "canUseDOM", isDocument);
    __publicField(this, "context");
    __publicField(this, "value", {
      setHelmet: (serverState) => {
        this.context.helmet = serverState;
      },
      helmetInstances: {
        get: () => this.canUseDOM ? instances : this.instances,
        add: (instance) => {
          (this.canUseDOM ? instances : this.instances).push(instance);
        },
        remove: (instance) => {
          const index = (this.canUseDOM ? instances : this.instances).indexOf(instance);
          (this.canUseDOM ? instances : this.instances).splice(index, 1);
        }
      }
    });
    this.context = context;
    this.canUseDOM = canUseDOM || false;
    if (!canUseDOM) {
      context.helmet = server_default({
        baseTag: [],
        bodyAttributes: {},
        htmlAttributes: {},
        linkTags: [],
        metaTags: [],
        noscriptTags: [],
        scriptTags: [],
        styleTags: [],
        title: "",
        titleAttributes: {}
      });
    }
  }
};
var defaultValue = {};
var Context = React.createContext(defaultValue);
var HelmetProvider = (_a = class extends Component {
  constructor(props) {
    super(props);
    __publicField(this, "helmetData");
    this.helmetData = new HelmetData(this.props.context || {}, _a.canUseDOM);
  }
  render() {
    return /* @__PURE__ */ React.createElement(Context.Provider, { value: this.helmetData.value }, this.props.children);
  }
}, __publicField(_a, "canUseDOM", isDocument), _a);
var updateTags = (type, tags) => {
  const headElement = document.head || document.querySelector(
    "head"
    /* HEAD */
  );
  const tagNodes = headElement.querySelectorAll(`${type}[${HELMET_ATTRIBUTE}]`);
  const oldTags = [].slice.call(tagNodes);
  const newTags = [];
  let indexToDelete;
  if (tags && tags.length) {
    tags.forEach((tag) => {
      const newElement = document.createElement(type);
      for (const attribute in tag) {
        if (Object.prototype.hasOwnProperty.call(tag, attribute)) {
          if (attribute === "innerHTML") {
            newElement.innerHTML = tag.innerHTML;
          } else if (attribute === "cssText") {
            if (newElement.styleSheet) {
              newElement.styleSheet.cssText = tag.cssText;
            } else {
              newElement.appendChild(document.createTextNode(tag.cssText));
            }
          } else {
            const attr = attribute;
            const value = typeof tag[attr] === "undefined" ? "" : tag[attr];
            newElement.setAttribute(attribute, value);
          }
        }
      }
      newElement.setAttribute(HELMET_ATTRIBUTE, "true");
      if (oldTags.some((existingTag, index) => {
        indexToDelete = index;
        return newElement.isEqualNode(existingTag);
      })) {
        oldTags.splice(indexToDelete, 1);
      } else {
        newTags.push(newElement);
      }
    });
  }
  oldTags.forEach((tag) => {
    var _a2;
    return (_a2 = tag.parentNode) == null ? void 0 : _a2.removeChild(tag);
  });
  newTags.forEach((tag) => headElement.appendChild(tag));
  return {
    oldTags,
    newTags
  };
};
var updateAttributes = (tagName, attributes) => {
  const elementTag = document.getElementsByTagName(tagName)[0];
  if (!elementTag) {
    return;
  }
  const helmetAttributeString = elementTag.getAttribute(HELMET_ATTRIBUTE);
  const helmetAttributes = helmetAttributeString ? helmetAttributeString.split(",") : [];
  const attributesToRemove = [...helmetAttributes];
  const attributeKeys = Object.keys(attributes);
  for (const attribute of attributeKeys) {
    const value = attributes[attribute] || "";
    if (elementTag.getAttribute(attribute) !== value) {
      elementTag.setAttribute(attribute, value);
    }
    if (helmetAttributes.indexOf(attribute) === -1) {
      helmetAttributes.push(attribute);
    }
    const indexToSave = attributesToRemove.indexOf(attribute);
    if (indexToSave !== -1) {
      attributesToRemove.splice(indexToSave, 1);
    }
  }
  for (let i = attributesToRemove.length - 1; i >= 0; i -= 1) {
    elementTag.removeAttribute(attributesToRemove[i]);
  }
  if (helmetAttributes.length === attributesToRemove.length) {
    elementTag.removeAttribute(HELMET_ATTRIBUTE);
  } else if (elementTag.getAttribute(HELMET_ATTRIBUTE) !== attributeKeys.join(",")) {
    elementTag.setAttribute(HELMET_ATTRIBUTE, attributeKeys.join(","));
  }
};
var updateTitle = (title, attributes) => {
  if (typeof title !== "undefined" && document.title !== title) {
    document.title = flattenArray(title);
  }
  updateAttributes("title", attributes);
};
var commitTagChanges = (newState, cb) => {
  const {
    baseTag,
    bodyAttributes,
    htmlAttributes,
    linkTags,
    metaTags,
    noscriptTags,
    onChangeClientState,
    scriptTags,
    styleTags,
    title,
    titleAttributes
  } = newState;
  updateAttributes("body", bodyAttributes);
  updateAttributes("html", htmlAttributes);
  updateTitle(title, titleAttributes);
  const tagUpdates = {
    baseTag: updateTags("base", baseTag),
    linkTags: updateTags("link", linkTags),
    metaTags: updateTags("meta", metaTags),
    noscriptTags: updateTags("noscript", noscriptTags),
    scriptTags: updateTags("script", scriptTags),
    styleTags: updateTags("style", styleTags)
  };
  const addedTags = {};
  const removedTags = {};
  Object.keys(tagUpdates).forEach((tagType) => {
    const { newTags, oldTags } = tagUpdates[tagType];
    if (newTags.length) {
      addedTags[tagType] = newTags;
    }
    if (oldTags.length) {
      removedTags[tagType] = tagUpdates[tagType].oldTags;
    }
  });
  if (cb) {
    cb();
  }
  onChangeClientState(newState, addedTags, removedTags);
};
var _helmetCallback = null;
var handleStateChangeOnClient = (newState) => {
  if (_helmetCallback) {
    cancelAnimationFrame(_helmetCallback);
  }
  if (newState.defer) {
    _helmetCallback = requestAnimationFrame(() => {
      commitTagChanges(newState, () => {
        _helmetCallback = null;
      });
    });
  } else {
    commitTagChanges(newState);
    _helmetCallback = null;
  }
};
var client_default = handleStateChangeOnClient;
var HelmetDispatcher = class extends Component {
  constructor() {
    super(...arguments);
    __publicField(this, "rendered", false);
  }
  shouldComponentUpdate(nextProps) {
    return !shallowEqual(nextProps, this.props);
  }
  componentDidUpdate() {
    this.emitChange();
  }
  componentWillUnmount() {
    const { helmetInstances } = this.props.context;
    helmetInstances.remove(this);
    this.emitChange();
  }
  emitChange() {
    const { helmetInstances, setHelmet } = this.props.context;
    let serverState = null;
    const state = reducePropsToState(
      helmetInstances.get().map((instance) => {
        const props = { ...instance.props };
        delete props.context;
        return props;
      })
    );
    if (HelmetProvider.canUseDOM) {
      client_default(state);
    } else if (server_default) {
      serverState = server_default(state);
    }
    setHelmet(serverState);
  }
  // componentWillMount will be deprecated
  // for SSR, initialize on first render
  // constructor is also unsafe in StrictMode
  init() {
    if (this.rendered) {
      return;
    }
    this.rendered = true;
    const { helmetInstances } = this.props.context;
    helmetInstances.add(this);
    this.emitChange();
  }
  render() {
    this.init();
    return null;
  }
};
var Helmet = (_b = class extends Component {
  shouldComponentUpdate(nextProps) {
    return !fastCompare(without(this.props, "helmetData"), without(nextProps, "helmetData"));
  }
  mapNestedChildrenToProps(child, nestedChildren) {
    if (!nestedChildren) {
      return null;
    }
    switch (child.type) {
      case "script":
      case "noscript":
        return {
          innerHTML: nestedChildren
        };
      case "style":
        return {
          cssText: nestedChildren
        };
      default:
        throw new Error(
          `<${child.type} /> elements are self-closing and can not contain children. Refer to our API for more information.`
        );
    }
  }
  flattenArrayTypeChildren(child, arrayTypeChildren, newChildProps, nestedChildren) {
    return {
      ...arrayTypeChildren,
      [child.type]: [
        ...arrayTypeChildren[child.type] || [],
        {
          ...newChildProps,
          ...this.mapNestedChildrenToProps(child, nestedChildren)
        }
      ]
    };
  }
  mapObjectTypeChildren(child, newProps, newChildProps, nestedChildren) {
    switch (child.type) {
      case "title":
        return {
          ...newProps,
          [child.type]: nestedChildren,
          titleAttributes: { ...newChildProps }
        };
      case "body":
        return {
          ...newProps,
          bodyAttributes: { ...newChildProps }
        };
      case "html":
        return {
          ...newProps,
          htmlAttributes: { ...newChildProps }
        };
      default:
        return {
          ...newProps,
          [child.type]: { ...newChildProps }
        };
    }
  }
  mapArrayTypeChildrenToProps(arrayTypeChildren, newProps) {
    let newFlattenedProps = { ...newProps };
    Object.keys(arrayTypeChildren).forEach((arrayChildName) => {
      newFlattenedProps = {
        ...newFlattenedProps,
        [arrayChildName]: arrayTypeChildren[arrayChildName]
      };
    });
    return newFlattenedProps;
  }
  warnOnInvalidChildren(child, nestedChildren) {
    invariant(
      VALID_TAG_NAMES.some((name) => child.type === name),
      typeof child.type === "function" ? `You may be attempting to nest <Helmet> components within each other, which is not allowed. Refer to our API for more information.` : `Only elements types ${VALID_TAG_NAMES.join(
        ", "
      )} are allowed. Helmet does not support rendering <${child.type}> elements. Refer to our API for more information.`
    );
    invariant(
      !nestedChildren || typeof nestedChildren === "string" || Array.isArray(nestedChildren) && !nestedChildren.some((nestedChild) => typeof nestedChild !== "string"),
      `Helmet expects a string as a child of <${child.type}>. Did you forget to wrap your children in braces? ( <${child.type}>{\`\`}</${child.type}> ) Refer to our API for more information.`
    );
    return true;
  }
  mapChildrenToProps(children, newProps) {
    let arrayTypeChildren = {};
    React.Children.forEach(children, (child) => {
      if (!child || !child.props) {
        return;
      }
      const { children: nestedChildren, ...childProps } = child.props;
      const newChildProps = Object.keys(childProps).reduce((obj, key) => {
        obj[HTML_TAG_MAP[key] || key] = childProps[key];
        return obj;
      }, {});
      let { type } = child;
      if (typeof type === "symbol") {
        type = type.toString();
      } else {
        this.warnOnInvalidChildren(child, nestedChildren);
      }
      switch (type) {
        case "Symbol(react.fragment)":
          newProps = this.mapChildrenToProps(nestedChildren, newProps);
          break;
        case "link":
        case "meta":
        case "noscript":
        case "script":
        case "style":
          arrayTypeChildren = this.flattenArrayTypeChildren(
            child,
            arrayTypeChildren,
            newChildProps,
            nestedChildren
          );
          break;
        default:
          newProps = this.mapObjectTypeChildren(child, newProps, newChildProps, nestedChildren);
          break;
      }
    });
    return this.mapArrayTypeChildrenToProps(arrayTypeChildren, newProps);
  }
  render() {
    const { children, ...props } = this.props;
    let newProps = { ...props };
    let { helmetData } = props;
    if (children) {
      newProps = this.mapChildrenToProps(children, newProps);
    }
    if (helmetData && !(helmetData instanceof HelmetData)) {
      const data = helmetData;
      helmetData = new HelmetData(data.context, true);
      delete newProps.helmetData;
    }
    return helmetData ? /* @__PURE__ */ React.createElement(HelmetDispatcher, { ...newProps, context: helmetData.value }) : /* @__PURE__ */ React.createElement(Context.Consumer, null, (context) => /* @__PURE__ */ React.createElement(HelmetDispatcher, { ...newProps, context }));
  }
}, __publicField(_b, "defaultProps", {
  defer: true,
  encodeSpecialCharacters: true,
  prioritizeSeoTags: false
}), _b);
const menuItems = [
  { id: "/", label: "Accueil", Icon: Home$1 },
  { id: "/reservation-taxi-vsl", label: "Réservation", Icon: CalendarCheck },
  { id: "/zones-desservies", label: "Zones", Icon: MapPin },
  { id: "/taxis-gares-parisiennes", label: "Gares", Icon: TrainFront },
  { id: "/qui-sommes-nous", label: "À propos", Icon: Users },
  { id: "/blog", label: "Blog", Icon: BookOpen }
];
function Header({ onNavigate }) {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isActive = (id) => location.pathname === id;
  return /* @__PURE__ */ jsxs("header", { className: "bg-white shadow-md sticky top-0 z-50", children: [
    /* @__PURE__ */ jsx("div", { className: "hidden sm:block bg-blue-700 text-white", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-4 h-9 flex justify-end items-center gap-4 text-sm", children: [
      /* @__PURE__ */ jsxs(
        "a",
        {
          href: "tel:+33650366491",
          className: "flex items-center gap-1.5 font-semibold hover:text-blue-200 transition-colors",
          "aria-label": "Appeler le 06 50 36 64 91",
          children: [
            /* @__PURE__ */ jsx(Phone, { size: 13, "aria-hidden": "true" }),
            "06 50 36 64 91"
          ]
        }
      ),
      /* @__PURE__ */ jsx("span", { className: "text-blue-500", "aria-hidden": "true", children: "|" }),
      /* @__PURE__ */ jsxs(
        "a",
        {
          href: "mailto:contact@taxisparis-conventionnes.fr",
          className: "flex items-center gap-1.5 font-semibold hover:text-blue-200 transition-colors",
          "aria-label": "Envoyer un email",
          children: [
            /* @__PURE__ */ jsx(Mail, { size: 13, "aria-hidden": "true" }),
            "contact@taxisparis-conventionnes.fr"
          ]
        }
      )
    ] }) }),
    /* @__PURE__ */ jsx("div", { className: "container mx-auto px-3 sm:px-4", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between h-14 sm:h-18 gap-2 sm:gap-3", children: [
      /* @__PURE__ */ jsx(
        Link,
        {
          to: "/",
          className: "flex-shrink-0 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-lg",
          "aria-label": "Retour à l'accueil",
          children: /* @__PURE__ */ jsx(
            "img",
            {
              src: "/taxi-logopng.png",
              alt: "",
              className: "h-9 sm:h-13 w-auto"
            }
          )
        }
      ),
      /* @__PURE__ */ jsxs(
        "nav",
        {
          className: "hidden md:flex items-center gap-1.5 lg:gap-2",
          role: "navigation",
          "aria-label": "Navigation principale",
          children: [
            menuItems.map(({ id, label, Icon }) => /* @__PURE__ */ jsxs(
              Link,
              {
                to: id,
                "aria-label": `Aller à ${label}`,
                "aria-current": isActive(id) ? "page" : void 0,
                className: [
                  "inline-flex items-center gap-1.5",
                  "font-bold text-sm lg:text-[0.9rem]",
                  "border-2 rounded-xl",
                  "px-3 lg:px-3.5 py-2",
                  "whitespace-nowrap",
                  "transition-all duration-200",
                  "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1",
                  isActive(id) ? "bg-blue-600 text-white border-blue-600 shadow-md" : "bg-white text-gray-900 border-blue-300 shadow-sm hover:bg-blue-50 hover:border-blue-500 hover:shadow-md"
                ].join(" "),
                children: [
                  /* @__PURE__ */ jsx(Icon, { size: 14, "aria-hidden": "true", className: "flex-shrink-0" }),
                  label
                ]
              },
              id
            )),
            /* @__PURE__ */ jsxs(
              "a",
              {
                href: "tel:+33650366491",
                className: "inline-flex items-center gap-1.5 ml-1 font-bold text-sm bg-blue-600 text-white border-2 border-blue-600 rounded-xl px-3 lg:px-3.5 py-2 whitespace-nowrap shadow-sm hover:bg-blue-700 hover:border-blue-700 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1",
                "aria-label": "Appeler le 06 50 36 64 91",
                children: [
                  /* @__PURE__ */ jsx(Phone, { size: 14, "aria-hidden": "true" }),
                  /* @__PURE__ */ jsx("span", { className: "hidden lg:inline", children: "06 50 36 64 91" }),
                  /* @__PURE__ */ jsx("span", { className: "lg:hidden", children: "Appeler" })
                ]
              }
            )
          ]
        }
      ),
      /* @__PURE__ */ jsxs("div", { className: "md:hidden flex items-center gap-1.5", children: [
        /* @__PURE__ */ jsxs(
          Link,
          {
            to: "/reservation-taxi-vsl",
            className: "flex items-center gap-1 bg-white text-blue-600 font-bold text-xs border-2 border-blue-500 rounded-xl px-2.5 h-10 hover:bg-blue-50 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 whitespace-nowrap",
            "aria-label": "Réserver un taxi",
            children: [
              /* @__PURE__ */ jsx(ArrowRight, { size: 13, "aria-hidden": "true" }),
              "Réserver"
            ]
          }
        ),
        /* @__PURE__ */ jsxs(
          "a",
          {
            href: "tel:+33650366491",
            className: "flex items-center gap-1 bg-blue-600 text-white font-bold text-xs rounded-xl px-2.5 h-10 hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 whitespace-nowrap",
            "aria-label": "Appeler le 06 50 36 64 91",
            children: [
              /* @__PURE__ */ jsx(Phone, { size: 13, "aria-hidden": "true" }),
              "Appeler"
            ]
          }
        ),
        /* @__PURE__ */ jsx(
          "button",
          {
            className: "flex items-center justify-center w-10 h-10 rounded-xl border-2 border-gray-200 text-gray-700 hover:border-blue-400 hover:bg-blue-50 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500",
            onClick: () => setIsMenuOpen(!isMenuOpen),
            "aria-label": isMenuOpen ? "Fermer le menu" : "Ouvrir le menu",
            "aria-expanded": isMenuOpen,
            "aria-controls": "mobile-menu",
            type: "button",
            children: isMenuOpen ? /* @__PURE__ */ jsx(X, { size: 18, "aria-hidden": "true" }) : /* @__PURE__ */ jsx(Menu, { size: 18, "aria-hidden": "true" })
          }
        )
      ] })
    ] }) }),
    isMenuOpen && /* @__PURE__ */ jsx("div", { className: "md:hidden border-t border-gray-100 bg-gray-50", children: /* @__PURE__ */ jsxs(
      "nav",
      {
        id: "mobile-menu",
        className: "container mx-auto px-4 py-3 grid grid-cols-2 gap-2",
        role: "navigation",
        "aria-label": "Menu mobile",
        children: [
          menuItems.map(({ id, label, Icon }) => /* @__PURE__ */ jsxs(
            Link,
            {
              to: id,
              onClick: () => setIsMenuOpen(false),
              "aria-label": `Aller à ${label}`,
              "aria-current": isActive(id) ? "page" : void 0,
              className: [
                "flex items-center gap-2",
                "font-bold text-sm",
                "border-2 rounded-xl px-3 py-3",
                "min-h-[48px]",
                "transition-all duration-200",
                "focus:outline-none focus:ring-2 focus:ring-blue-500",
                isActive(id) ? "bg-blue-600 text-white border-blue-600 shadow-md" : "bg-white text-gray-900 border-blue-300 shadow-sm hover:bg-blue-50 hover:border-blue-500"
              ].join(" "),
              children: [
                /* @__PURE__ */ jsx(Icon, { size: 15, "aria-hidden": "true", className: "flex-shrink-0" }),
                label
              ]
            },
            id
          )),
          /* @__PURE__ */ jsxs(
            "a",
            {
              href: "tel:+33650366491",
              className: "col-span-2 flex items-center justify-center gap-2 font-bold text-sm bg-blue-600 text-white border-2 border-blue-600 rounded-xl px-3 py-3 min-h-[48px] shadow-md hover:bg-blue-700 transition-colors",
              "aria-label": "Appeler le 06 50 36 64 91",
              onClick: () => setIsMenuOpen(false),
              children: [
                /* @__PURE__ */ jsx(Phone, { size: 16, "aria-hidden": "true" }),
                "Appeler maintenant – 06 50 36 64 91"
              ]
            }
          )
        ]
      }
    ) })
  ] });
}
function Footer({ onNavigate } = {}) {
  return /* @__PURE__ */ jsx("footer", { className: "bg-gray-900 text-white mt-20", role: "contentinfo", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-4 py-8 sm:py-12", children: [
    /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h3", { className: "text-lg sm:text-xl font-bold mb-3 sm:mb-4 text-blue-400", id: "footer-title", children: "Taxi VSL" }),
        /* @__PURE__ */ jsx("p", { className: "text-gray-400 text-sm sm:text-base leading-relaxed", children: "Service de taxi conventionné en Île-de-France. Disponible 24h/24, 7j/7." })
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h4", { className: "font-semibold mb-3 sm:mb-4 text-blue-400 text-base", children: "Contact" }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxs("a", { href: "tel:+33650366491", className: "flex items-center gap-2 text-gray-400 hover:text-white transition-colors py-2 px-1 min-h-[44px] text-sm sm:text-base", "aria-label": "Appeler le 06 50 36 64 91", children: [
            /* @__PURE__ */ jsx(Phone, { size: 18, "aria-hidden": "true" }),
            /* @__PURE__ */ jsx("span", { children: "06 50 36 64 91" })
          ] }),
          /* @__PURE__ */ jsxs("a", { href: "mailto:contact@taxisparis-conventionnes.fr", className: "flex items-start gap-2 text-gray-400 hover:text-white transition-colors py-2 px-1 min-h-[44px] text-sm sm:text-base", "aria-label": "Envoyer un email", children: [
            /* @__PURE__ */ jsx(Mail, { size: 18, "aria-hidden": "true", className: "mt-0.5" }),
            /* @__PURE__ */ jsx("span", { className: "break-all", children: "contact@taxisparis-conventionnes.fr" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-2 text-gray-400 py-2 px-1 text-sm sm:text-base", children: [
            /* @__PURE__ */ jsx(MapPin, { size: 18, "aria-hidden": "true", className: "mt-0.5 flex-shrink-0" }),
            /* @__PURE__ */ jsx("span", { children: "Paris, Île-de-France" })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h4", { className: "font-semibold mb-3 sm:mb-4 text-blue-400 text-base", children: "Zones desservies" }),
        /* @__PURE__ */ jsx("nav", { "aria-label": "Zones desservies", children: /* @__PURE__ */ jsx("ul", { className: "space-y-1", children: [
          { code: "75", name: "Paris", path: "/taxi-conventionne-paris-75" },
          { code: "91", name: "Essonne", path: "/taxi-conventionne-essonne-91" },
          { code: "92", name: "Hauts-de-Seine", path: "/taxi-conventionne-hauts-de-seine-92" },
          { code: "93", name: "Seine-Saint-Denis", path: "/taxi-conventionne-seine-saint-denis-93" },
          { code: "94", name: "Val-de-Marne", path: "/taxi-conventionne-val-de-marne-94" }
        ].map((dept) => /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsxs(
          Link,
          {
            to: dept.path,
            className: "text-gray-400 hover:text-white transition-colors text-left py-1.5 px-1 min-h-[44px] text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-400 rounded block",
            "aria-label": `Voir la zone ${dept.name} (${dept.code})`,
            children: [
              dept.name,
              " (",
              dept.code,
              ")"
            ]
          }
        ) }, dept.code)) }) })
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h4", { className: "font-semibold mb-3 sm:mb-4 text-blue-400 text-base", children: "Liens utiles" }),
        /* @__PURE__ */ jsx("nav", { "aria-label": "Liens utiles", children: /* @__PURE__ */ jsxs("ul", { className: "space-y-1", children: [
          /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(
            "a",
            {
              href: "/qui-sommes-nous",
              className: "text-gray-400 hover:text-white transition-colors block py-1.5 px-1 min-h-[44px] text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-400 rounded",
              children: "Qui sommes-nous ?"
            }
          ) }),
          /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(
            "a",
            {
              href: "/faq",
              className: "text-gray-400 hover:text-white transition-colors block py-1.5 px-1 min-h-[44px] text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-400 rounded",
              children: "FAQ"
            }
          ) }),
          /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(
            "a",
            {
              href: "/blog",
              className: "text-gray-400 hover:text-white transition-colors block py-1.5 px-1 min-h-[44px] text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-400 rounded",
              children: "Blog"
            }
          ) }),
          /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(
            "a",
            {
              href: "/contact",
              className: "text-gray-400 hover:text-white transition-colors block py-1.5 px-1 min-h-[44px] text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-400 rounded",
              children: "Contact"
            }
          ) }),
          /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(
            "a",
            {
              href: "/mentions-legales",
              className: "text-gray-400 hover:text-white transition-colors block py-1.5 px-1 min-h-[44px] text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-400 rounded",
              children: "Mentions Légales"
            }
          ) }),
          /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(
            "a",
            {
              href: "/conditions-generales-de-vente",
              className: "text-gray-400 hover:text-white transition-colors block py-1.5 px-1 min-h-[44px] text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-400 rounded",
              children: "Conditions Générales de Vente"
            }
          ) }),
          /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(
            "a",
            {
              href: "/conditions-generales",
              className: "text-gray-400 hover:text-white transition-colors block py-1.5 px-1 min-h-[44px] text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-400 rounded",
              children: "Conditions Générales"
            }
          ) })
        ] }) }),
        /* @__PURE__ */ jsxs("div", { className: "mt-6", children: [
          /* @__PURE__ */ jsx("h4", { className: "font-semibold mb-3 text-blue-400 text-base", children: "Suivez-nous" }),
          /* @__PURE__ */ jsxs("div", { className: "flex gap-4", children: [
            /* @__PURE__ */ jsx("a", { href: "#", className: "text-gray-400 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400 rounded p-2 min-h-[44px] min-w-[44px] flex items-center justify-center", "aria-label": "Suivez-nous sur Facebook", children: /* @__PURE__ */ jsx(Facebook, { size: 20, "aria-hidden": "true" }) }),
            /* @__PURE__ */ jsx("a", { href: "#", className: "text-gray-400 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400 rounded p-2 min-h-[44px] min-w-[44px] flex items-center justify-center", "aria-label": "Suivez-nous sur Twitter", children: /* @__PURE__ */ jsx(Twitter, { size: 20, "aria-hidden": "true" }) }),
            /* @__PURE__ */ jsx("a", { href: "#", className: "text-gray-400 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400 rounded p-2 min-h-[44px] min-w-[44px] flex items-center justify-center", "aria-label": "Suivez-nous sur LinkedIn", children: /* @__PURE__ */ jsx(Linkedin, { size: 20, "aria-hidden": "true" }) })
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "border-t border-gray-800 mt-6 sm:mt-8 pt-6 sm:pt-8 text-center text-xs sm:text-sm text-gray-400", children: /* @__PURE__ */ jsxs("p", { children: [
      "© ",
      (/* @__PURE__ */ new Date()).getFullYear(),
      " Taxi VSL Île-de-France. Tous droits réservés."
    ] }) })
  ] }) });
}
const GA_ID = "G-3780TKJD8H";
function GoogleAnalytics({ measurementId }) {
  const id = measurementId || GA_ID;
  const location = useLocation();
  useEffect(() => {
    if (window.gtag) return;
    const script1 = document.createElement("script");
    script1.async = true;
    script1.src = `https://www.googletagmanager.com/gtag/js?id=${id}`;
    document.head.appendChild(script1);
    window.dataLayer = window.dataLayer || [];
    window.gtag = function() {
      window.dataLayer.push(arguments);
    };
    window.gtag("js", /* @__PURE__ */ new Date());
    window.gtag("config", id, { send_page_view: true });
  }, [id]);
  useEffect(() => {
    if (window.gtag && id) {
      window.gtag("config", id, { page_path: location.pathname + location.search });
    }
  }, [location, id]);
  return null;
}
function cleanSeoText(input) {
  return input.replace(/\b(médicalisé|medicalise|médicalisée|medicalisee|médicalisés|medicalises|médicalisées|medicalisees)\b/gi, "").replace(/\b(navette|navettes)\b/gi, "").replace(/\b(liaison|liaisons)\b/gi, "").replace(/\s{2,}/g, " ").replace(/\s+([:;,.\-!?\)])/g, "$1").replace(/\(\s+/g, "(").replace(/\s+\)/g, ")").trim();
}
const CANONICAL_DOMAIN = "https://www.taxisparis-conventionnes.fr";
function SEOHead({
  title,
  description,
  keywords,
  author = "Taxi Conventionné",
  robots = "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
  canonical,
  jsonLD
}) {
  const location = useLocation();
  const rawPath = location.pathname.replace(/\/+$/, "") || "";
  const normalizedPath = rawPath === "" ? "/" : `${rawPath}/`;
  const canonicalUrl = canonical ? canonical.endsWith("/") ? canonical : `${canonical}/` : `${CANONICAL_DOMAIN}${normalizedPath}`;
  const safeTitle = cleanSeoText(title);
  const safeDescription = cleanSeoText(description);
  const keywordsString = keywords ? Array.isArray(keywords) ? keywords.join(", ") : keywords : "";
  const safeKeywords = keywordsString ? cleanSeoText(keywordsString) : "";
  const jsonLDArray = jsonLD ? Array.isArray(jsonLD) ? jsonLD.filter(Boolean) : [jsonLD].filter(Boolean) : [];
  return /* @__PURE__ */ jsxs(Helmet, { children: [
    /* @__PURE__ */ jsx("title", { children: safeTitle }),
    /* @__PURE__ */ jsx("meta", { name: "description", content: safeDescription }),
    /* @__PURE__ */ jsx("meta", { name: "author", content: author }),
    /* @__PURE__ */ jsx("meta", { name: "robots", content: robots }),
    safeKeywords && /* @__PURE__ */ jsx("meta", { name: "keywords", content: safeKeywords }),
    /* @__PURE__ */ jsx("link", { rel: "canonical", href: canonicalUrl }),
    /* @__PURE__ */ jsx("meta", { property: "og:url", content: canonicalUrl }),
    /* @__PURE__ */ jsx("meta", { property: "og:title", content: safeTitle }),
    /* @__PURE__ */ jsx("meta", { property: "og:description", content: safeDescription }),
    /* @__PURE__ */ jsx("meta", { property: "og:type", content: "website" }),
    /* @__PURE__ */ jsx("meta", { property: "og:locale", content: "fr_FR" }),
    /* @__PURE__ */ jsx("meta", { property: "og:site_name", content: "Taxis Paris Conventionnés" }),
    /* @__PURE__ */ jsx("meta", { name: "twitter:card", content: "summary_large_image" }),
    /* @__PURE__ */ jsx("meta", { name: "twitter:title", content: safeTitle }),
    /* @__PURE__ */ jsx("meta", { name: "twitter:description", content: safeDescription }),
    jsonLDArray.map((schema, index) => /* @__PURE__ */ jsx("script", { type: "application/ld+json", children: JSON.stringify(schema) }, `jsonld-${index}`))
  ] });
}
const supabaseUrl = "https://qwsgtmzpirrbnmcbdvue.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF3c2d0bXpwaXJyYm5tY2JkdnVlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODAyNDUzMjQsImV4cCI6MjA5NTgyMTMyNH0.RFb45xZjY3pDV4QWgr9-ASta84bX09fIcbv7ZZlY_mk";
const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true
  },
  realtime: {
    params: {
      eventsPerSecond: 10
    }
  },
  global: {
    headers: {
      "X-Client-Info": "supabase-js/web"
    }
  }
});
const PHONE = "06 50 36 64 91";
const PHONE_SCHEMA = "+33650366491";
const ALL_HOSPITALS = [
  "Institut Gustave Roussy (Villejuif)",
  "Hôpital Bicêtre (Le Kremlin-Bicêtre)",
  "Hôpital Lariboisière (Paris 10e)",
  "Hôpital Saint-Louis (Paris 10e)",
  "Hôpital Pitié-Salpêtrière (Paris 13e)",
  "Hôpital Cochin (Paris 14e)",
  "Hôpital Georges Pompidou (Paris 15e)",
  "Hôpital Antoine Béclère (Clamart)",
  "Hôpital Ambroise Paré (Boulogne-Billancourt)",
  "Hôpital de Villeneuve-Saint-Georges"
];
const departmentsSEO = {
  "75": {
    code: "75",
    name: "Paris",
    metaTitle: "Taxi Conventionné Paris (75) | CPAM | Transport Médical 24h/24",
    metaDescription: "Taxi conventionné à Paris (75). Transport médical remboursé CPAM vers hôpitaux de Paris et Île-de-France. Dialyse, chimio, hospitalisation. Réservation 24h/24 : 06 50 36 64 91.",
    h1: "Taxi Conventionné dans Paris (75)",
    uniqueParagraph: `Paris concentre les plus grands établissements hospitaliers d'Île-de-France, accessibles depuis tous les arrondissements via notre service de taxi conventionné agréé CPAM. Que vous résidiez dans le 13e pour rejoindre la Pitié-Salpêtrière, dans le 10e vers Lariboisière ou Saint-Louis, dans le 14e pour Cochin, ou dans le 15e vers Georges Pompidou, nos chauffeurs connaissent parfaitement les axes parisiens : boulevards périphériques, axes nord-sud et rues intérieures. Les transports en commun parisiens (métro, RER) ne sont pas toujours adaptés aux patients en cours de traitement lourd. Notre service porte-à-porte garantit confort et ponctualité pour vos dialyses, chimiothérapies et radiothérapies, sur prescription médicale avec tiers-payant CPAM. Disponible 24h/24, 7j/7 au ${PHONE}.`,
    content: `Notre service de taxi conventionné CPAM à Paris (75) assure vos transports médicaux prescrits vers l'ensemble des hôpitaux parisiens et franciliens. Dialyse, chimiothérapie, radiothérapie, consultations spécialisées, hospitalisations : chaque trajet est organisé avec rigueur et ponctualité.

Nous desservons les 20 arrondissements de Paris intra-muros. Sur prescription médicale de transport, le tiers-payant CPAM s'applique selon votre situation. Aucune avance de frais dans la plupart des cas.`,
    keywords: [
      "taxi conventionné paris 75",
      "taxi cpam paris",
      "transport médical paris",
      "taxi dialyse paris",
      "taxi chimiothérapie paris",
      "taxi hospitalisation paris",
      "transport médical remboursé paris",
      "taxi conventionné ap-hp"
    ],
    cities: [
      "Paris 1er",
      "Paris 2ème",
      "Paris 3ème",
      "Paris 4ème",
      "Paris 5ème",
      "Paris 6ème",
      "Paris 7ème",
      "Paris 8ème",
      "Paris 9ème",
      "Paris 10ème",
      "Paris 11ème",
      "Paris 12ème",
      "Paris 13ème",
      "Paris 14ème",
      "Paris 15ème",
      "Paris 16ème",
      "Paris 17ème",
      "Paris 18ème",
      "Paris 19ème",
      "Paris 20ème"
    ],
    hospitals: ALL_HOSPITALS,
    faq: [
      {
        q: "Comment réserver un taxi conventionné à Paris ?",
        a: `Appelez-nous au ${PHONE} ou réservez en ligne sur notre formulaire. Munissez-vous de votre prescription médicale de transport (PMT) et de votre carte Vitale. Nous confirmons votre trajet sous quelques minutes.`
      },
      {
        q: "Le transport est-il remboursé par la CPAM à Paris ?",
        a: "Oui, sur prescription médicale de transport, la CPAM prend en charge 65% à 100% du trajet selon votre situation (ALD, maternité, accident du travail). Le tiers-payant évite toute avance de frais dans la plupart des cas."
      },
      {
        q: "Desservez-vous tous les arrondissements de Paris ?",
        a: "Oui, nous desservons l'intégralité de Paris intra-muros, des 20 arrondissements, ainsi que la banlieue parisienne pour vos rendez-vous médicaux prescrits."
      },
      {
        q: "Quels délais pour réserver un taxi médical à Paris ?",
        a: "Nous recommandons de réserver 24h à 48h à l'avance pour les rendez-vous programmés. Pour les demandes urgentes, appelez directement le 06 50 36 64 91 et nous organisons votre transport dans les meilleurs délais."
      }
    ],
    regionName: "Île-de-France"
  },
  "91": {
    code: "91",
    name: "Essonne",
    metaTitle: "Taxi Conventionné Essonne (91) | CPAM | Transport Médical 24h/24",
    metaDescription: "Taxi conventionné dans l'Essonne (91). Transport médical remboursé CPAM vers hôpitaux de Paris et Île-de-France. Dialyse, chimio, hospitalisation. Réservation 24h/24 : 06 50 36 64 91.",
    h1: "Taxi Conventionné dans l'Essonne (91)",
    uniqueParagraph: `L'Essonne (91) bénéficie d'un accès direct à Paris via le RER B (Massy, Orsay, Gif-sur-Yvette), le RER C (Juvisy, Savigny, Viry-Châtillon) et l'A6 / Francilienne. Ces axes permettent des trajets rapides vers les grands hôpitaux parisiens : Bicêtre au Kremlin-Bicêtre, la Pitié-Salpêtrière, Cochin ou l'Institut Gustave Roussy à Villejuif. Notre service de taxi conventionné CPAM couvre l'ensemble du département, des communes du nord (Massy, Palaiseau, Athis-Mons) jusqu'au sud (Étampes, Dourdan, Milly-la-Forêt). Pour vos dialyses, chimiothérapies, radiothérapies ou consultations spécialisées, nos chauffeurs vous prennent en charge à domicile et vous déposent à l'entrée de l'établissement de soins. Service disponible 24h/24 au ${PHONE}.`,
    content: `Notre service de taxi conventionné CPAM en Essonne (91) assure vos transports médicaux prescrits vers les hôpitaux de Paris et d'Île-de-France. Dialyse, chimiothérapie, radiothérapie, consultations spécialisées, hospitalisations programmées : chaque trajet est organisé avec rigueur.

Nous couvrons l'ensemble des communes de l'Essonne. Sur prescription médicale de transport, le tiers-payant CPAM s'applique selon votre situation.`,
    keywords: [
      "taxi conventionné essonne 91",
      "taxi cpam essonne",
      "transport médical 91",
      "taxi dialyse essonne",
      "taxi chimiothérapie essonne",
      "taxi hospitalisation essonne",
      "transport médical remboursé essonne"
    ],
    cities: [
      "Évry-Courcouronnes",
      "Corbeil-Essonnes",
      "Massy",
      "Savigny-sur-Orge",
      "Sainte-Geneviève-des-Bois",
      "Brunoy",
      "Draveil",
      "Viry-Châtillon",
      "Athis-Mons",
      "Juvisy-sur-Orge",
      "Yerres",
      "Palaiseau",
      "Chilly-Mazarin",
      "Longjumeau",
      "Ris-Orangis"
    ],
    hospitals: ALL_HOSPITALS,
    faq: [
      {
        q: "Comment réserver un taxi conventionné en Essonne ?",
        a: `Appelez le ${PHONE} ou utilisez notre formulaire en ligne. Préparez votre prescription médicale de transport (PMT) et votre carte Vitale. Nous confirmons votre réservation rapidement.`
      },
      {
        q: "Le transport est-il remboursé par la CPAM en Essonne ?",
        a: "Oui, sur prescription médicale, la CPAM prend en charge 65% à 100% du coût du transport. Pour les patients en ALD, maternité ou accident du travail, le tiers-payant intégral s'applique généralement."
      },
      {
        q: "Desservez-vous toutes les communes de l'Essonne ?",
        a: "Oui, nous intervenons dans l'ensemble du département 91, du nord (Massy, Juvisy) jusqu'au sud (Étampes, Dourdan, Milly-la-Forêt), en passant par Évry, Corbeil-Essonnes et tous les autres secteurs."
      },
      {
        q: "Quels délais pour un taxi médical en Essonne ?",
        a: "Nous recommandons une réservation 24h à 48h à l'avance. Pour les urgences ou les créneaux de dernière minute, contactez-nous directement au 06 50 36 64 91."
      }
    ],
    regionName: "Île-de-France"
  },
  "92": {
    code: "92",
    name: "Hauts-de-Seine",
    metaTitle: "Taxi Conventionné Hauts-de-Seine (92) | CPAM | Transport Médical 24h/24",
    metaDescription: "Taxi conventionné dans les Hauts-de-Seine (92). Transport médical remboursé CPAM vers hôpitaux de Paris et Île-de-France. Dialyse, chimio, hospitalisation. Réservation 24h/24 : 06 50 36 64 91.",
    h1: "Taxi Conventionné dans les Hauts-de-Seine (92)",
    uniqueParagraph: `Les Hauts-de-Seine (92) jouxtent directement Paris, offrant des accès rapides vers les grands hôpitaux de l'ouest parisien : Hôpital Antoine Béclère à Clamart, Hôpital Ambroise Paré à Boulogne-Billancourt, et les établissements parisiens via l'A13, l'A86, le RER A (Boulogne, La Défense) et le RER C (Issy, Clamart, Vanves). Notre service de taxi conventionné CPAM dessert l'ensemble du département 92, des communes du nord (Asnières-sur-Seine, Colombes, Gennevilliers) jusqu'au sud (Antony, Sceaux, Bourg-la-Reine), en passant par Nanterre, Boulogne, Issy-les-Moulineaux et Neuilly-sur-Seine. Pour vos dialyses, chimiothérapies, radiothérapies et consultations spécialisées, nos chauffeurs professionnels assurent une prise en charge à domicile et une dépose directe à l'établissement. Disponible 24h/24, 7j/7 au ${PHONE}.`,
    content: `Notre service de taxi conventionné CPAM dans les Hauts-de-Seine (92) organise vos transports médicaux prescrits vers les hôpitaux de Paris et d'Île-de-France. Dialyse, chimiothérapie, radiothérapie, consultations, hospitalisations : chaque trajet est pris en charge avec ponctualité et professionnalisme.

Nous couvrons toutes les communes du département 92. Sur prescription médicale de transport, le tiers-payant CPAM s'applique selon votre situation.`,
    keywords: [
      "taxi conventionné hauts-de-seine 92",
      "taxi cpam 92",
      "transport médical hauts-de-seine",
      "taxi dialyse 92",
      "taxi chimiothérapie hauts-de-seine",
      "taxi hospitalisation 92",
      "transport médical remboursé 92"
    ],
    cities: [
      "Nanterre",
      "Boulogne-Billancourt",
      "Courbevoie",
      "Colombes",
      "Rueil-Malmaison",
      "Levallois-Perret",
      "Issy-les-Moulineaux",
      "Neuilly-sur-Seine",
      "Antony",
      "Clamart"
    ],
    hospitals: ALL_HOSPITALS,
    faq: [
      {
        q: "Comment réserver un taxi conventionné dans les Hauts-de-Seine ?",
        a: `Appelez le ${PHONE} ou réservez via notre formulaire en ligne. Préparez votre prescription médicale de transport et votre carte Vitale. Nous confirmons votre trajet rapidement.`
      },
      {
        q: "Le transport est-il remboursé par la CPAM dans le 92 ?",
        a: "Oui, sur prescription médicale, la CPAM prend en charge 65% à 100% du trajet. Pour les patients ALD, maternité ou accident du travail, le tiers-payant intégral s'applique généralement — sans avance de frais."
      },
      {
        q: "Desservez-vous toutes les communes des Hauts-de-Seine ?",
        a: "Oui, nous couvrons l'intégralité du 92 : Nanterre, Boulogne, Issy, Clamart, Antony, Neuilly, Colombes, Asnières, Gennevilliers, Montrouge, et toutes les autres communes du département."
      },
      {
        q: "Quels délais pour un taxi médical dans les Hauts-de-Seine ?",
        a: "Nous recommandons une réservation 24h à 48h avant votre rendez-vous. Pour les urgences, contactez-nous au 06 50 36 64 91 : nous faisons notre possible pour vous satisfaire dans les meilleurs délais."
      }
    ],
    regionName: "Île-de-France"
  },
  "93": {
    code: "93",
    name: "Seine-Saint-Denis",
    metaTitle: "Taxi Conventionné Seine-Saint-Denis (93) | CPAM | Transport Médical 24h/24",
    metaDescription: "Taxi conventionné en Seine-Saint-Denis (93). Transport médical remboursé CPAM vers hôpitaux de Paris et Île-de-France. Dialyse, chimio, hospitalisation. Réservation 24h/24 : 06 50 36 64 91.",
    h1: "Taxi Conventionné en Seine-Saint-Denis (93)",
    uniqueParagraph: `La Seine-Saint-Denis (93) est desservie par de nombreux axes routiers et ferroviaires permettant d'accéder rapidement aux centres hospitaliers majeurs : l'A1 et l'A3 vers Paris, le RER B (Saint-Denis, Le Bourget, Aulnay), le RER E et les lignes de métro 5, 7, 12, 13. Depuis Saint-Denis, Montreuil, Aubervilliers ou Pantin, nos chauffeurs vous conduisent vers Lariboisière (Paris 10e), Saint-Louis (Paris 10e), la Pitié-Salpêtrière (Paris 13e) ou l'Institut Gustave Roussy (Villejuif). Notre service de taxi conventionné CPAM couvre l'ensemble du département 93, y compris les communes les plus éloignées comme Tremblay-en-France, Villepinte ou Vaujours. Pour vos dialyses, chimiothérapies, radiothérapies et toutes consultations sur prescription, nous assurons un transport médical confortable et ponctuel. Disponible 24h/24, 7j/7 au ${PHONE}.`,
    content: `Notre service de taxi conventionné CPAM en Seine-Saint-Denis (93) prend en charge vos transports médicaux prescrits vers les hôpitaux de Paris et d'Île-de-France. Dialyse, chimiothérapie, radiothérapie, consultations, hospitalisations programmées : nous organisons chaque trajet avec rigueur.

Nous couvrons toutes les communes du 93. Sur prescription médicale de transport, le tiers-payant CPAM s'applique selon votre situation.`,
    keywords: [
      "taxi conventionné seine-saint-denis 93",
      "taxi cpam 93",
      "transport médical seine-saint-denis",
      "taxi dialyse 93",
      "taxi chimiothérapie seine-saint-denis",
      "taxi hospitalisation 93",
      "transport médical remboursé 93"
    ],
    cities: [
      "Saint-Denis",
      "Montreuil",
      "Aubervilliers",
      "Aulnay-sous-Bois",
      "Drancy",
      "Noisy-le-Grand",
      "Pantin",
      "Le Blanc-Mesnil",
      "Épinay-sur-Seine",
      "Bobigny"
    ],
    hospitals: ALL_HOSPITALS,
    faq: [
      {
        q: "Comment réserver un taxi conventionné en Seine-Saint-Denis ?",
        a: `Appelez le ${PHONE} ou utilisez notre formulaire de réservation en ligne. Munissez-vous de votre prescription médicale de transport (PMT) et de votre carte Vitale. La confirmation est immédiate.`
      },
      {
        q: "Le transport est-il remboursé par la CPAM dans le 93 ?",
        a: "Oui, sur prescription médicale, la CPAM prend en charge 65% à 100% du coût du transport médical. Les patients en ALD, maternité ou AT bénéficient généralement du tiers-payant intégral sans avance de frais."
      },
      {
        q: "Desservez-vous toutes les communes de Seine-Saint-Denis ?",
        a: "Oui, nous intervenons dans l'ensemble du département 93 : Saint-Denis, Montreuil, Aubervilliers, Pantin, Aulnay-sous-Bois, Bobigny, Tremblay-en-France, Villepinte, et toutes les autres communes."
      },
      {
        q: "Quels délais pour un taxi médical en Seine-Saint-Denis ?",
        a: "Réservez de préférence 24h à 48h à l'avance. Pour les demandes urgentes ou de dernière minute, contactez-nous directement au 06 50 36 64 91 : nous faisons tout pour vous répondre rapidement."
      }
    ],
    regionName: "Île-de-France"
  },
  "94": {
    code: "94",
    name: "Val-de-Marne",
    metaTitle: "Taxi Conventionné Val-de-Marne (94) | CPAM | Transport Médical 24h/24",
    metaDescription: "Taxi conventionné dans le Val-de-Marne (94). Transport médical remboursé CPAM vers hôpitaux de Paris et Île-de-France. Dialyse, chimio, hospitalisation. Réservation 24h/24 : 06 50 36 64 91.",
    h1: "Taxi Conventionné dans le Val-de-Marne (94)",
    uniqueParagraph: `Le Val-de-Marne (94) abrite deux établissements de référence nationale : l'Institut Gustave Roussy à Villejuif, centre de lutte contre le cancer, et l'Hôpital Bicêtre au Kremlin-Bicêtre. Notre service de taxi conventionné CPAM dessert l'ensemble du département 94, des communes bordant Paris (Ivry-sur-Seine, Charenton, Vincennes) jusqu'aux secteurs plus éloignés (Orly, Boissy-Saint-Léger, Mandres-les-Roses). Les accès sont facilités par l'A86, l'A4, l'A6 ainsi que le RER A (Vincennes, Saint-Maur), le RER B (Le Kremlin-Bicêtre) et le RER C (Choisy-le-Roi, Villeneuve-Saint-Georges). Pour vos dialyses répétées, vos cycles de chimiothérapie à Gustave Roussy, vos radiothérapies ou consultations hospitalières, nos chauffeurs professionnels assurent un transport confortable et fiable. Disponible 24h/24, 7j/7 au ${PHONE}.`,
    content: `Notre service de taxi conventionné CPAM dans le Val-de-Marne (94) prend en charge vos transports médicaux prescrits vers les hôpitaux de Paris et d'Île-de-France, dont l'Institut Gustave Roussy et l'Hôpital Bicêtre. Dialyse, chimiothérapie, radiothérapie, consultations, hospitalisations : chaque déplacement est organisé avec professionnalisme.

Nous couvrons l'ensemble des communes du 94. Sur prescription médicale de transport, le tiers-payant CPAM s'applique selon votre situation.`,
    keywords: [
      "taxi conventionné val-de-marne 94",
      "taxi cpam 94",
      "transport médical val-de-marne",
      "taxi dialyse 94",
      "taxi chimiothérapie 94",
      "taxi gustave roussy",
      "taxi bicetre",
      "transport médical remboursé 94"
    ],
    cities: [
      "Créteil",
      "Vitry-sur-Seine",
      "Champigny-sur-Marne",
      "Saint-Maur-des-Fossés",
      "Ivry-sur-Seine",
      "Maisons-Alfort",
      "Fontenay-sous-Bois",
      "Villejuif",
      "Vincennes",
      "Le Kremlin-Bicêtre"
    ],
    hospitals: ALL_HOSPITALS,
    faq: [
      {
        q: "Comment réserver un taxi conventionné dans le Val-de-Marne ?",
        a: `Appelez le ${PHONE} ou réservez en ligne sur notre site. Préparez votre prescription médicale de transport et votre carte Vitale. Nous confirmons votre trajet immédiatement.`
      },
      {
        q: "Le transport est-il remboursé par la CPAM dans le 94 ?",
        a: "Oui, sur prescription médicale, la CPAM prend en charge 65% à 100% du coût. Pour les patients en ALD (notamment les patients suivis à Gustave Roussy ou Bicêtre), le tiers-payant intégral s'applique généralement."
      },
      {
        q: "Desservez-vous toutes les communes du Val-de-Marne ?",
        a: "Oui, nous couvrons l'intégralité du département 94 : Créteil, Villejuif, Ivry, Vincennes, Champigny, Saint-Maur, Nogent, Orly, Boissy-Saint-Léger et toutes les autres communes."
      },
      {
        q: "Quels délais pour un taxi médical dans le Val-de-Marne ?",
        a: "Nous recommandons une réservation 24h à 48h à l'avance, particulièrement pour les créneaux tôt le matin vers Gustave Roussy ou Bicêtre. Pour les urgences, appelez le 06 50 36 64 91 directement."
      }
    ],
    regionName: "Île-de-France"
  }
};
function slugify(input) {
  return input.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/&/g, " et ").replace(/['']/g, "-").replace(/[^a-z0-9]+/g, "-").replace(/-+/g, "-").replace(/^-|-$/g, "");
}
function generateJsonLD(department) {
  const baseUrl = "https://www.taxisparis-conventionnes.fr";
  const deptData = department ? departmentsSEO[department] : null;
  if (department && deptData) {
    const deptSlug = `taxi-conventionne-${slugify(deptData.name)}-${department}`;
    return {
      "@context": "https://schema.org",
      "@type": ["LocalBusiness", "MedicalBusiness"],
      "@id": `${baseUrl}/${deptSlug}/#service`,
      "name": `Taxi Conventionné CPAM ${deptData.name} (${department})`,
      "url": `${baseUrl}/${deptSlug}`,
      "telephone": PHONE_SCHEMA,
      "email": "contact@taxisparis-conventionnes.fr",
      "openingHoursSpecification": {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
        "opens": "00:00",
        "closes": "23:59"
      },
      "areaServed": {
        "@type": "AdministrativeArea",
        "name": `${deptData.name} (${department})`,
        "addressCountry": "FR"
      },
      "address": {
        "@type": "PostalAddress",
        "addressRegion": deptData.name,
        "addressCountry": "FR"
      },
      "priceRange": "Tiers-payant CPAM",
      "medicalSpecialty": "Transport sanitaire conventionné"
    };
  }
  return {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "MedicalBusiness"],
    "@id": `${baseUrl}/#taxiservice`,
    "name": "Taxi Conventionné CPAM Île-de-France",
    "url": baseUrl,
    "telephone": PHONE_SCHEMA,
    "areaServed": {
      "@type": "AdministrativeArea",
      "name": "Île-de-France",
      "addressCountry": "FR"
    }
  };
}
function generateBreadcrumbList(items) {
  const baseUrl = "https://www.taxisparis-conventionnes.fr";
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": `${baseUrl}${item.url.endsWith("/") ? item.url.slice(0, -1) || "/" : item.url}`
    }))
  };
}
function Home({ onNavigate }) {
  const [homeLogoUrl, setHomeLogoUrl] = useState("");
  useEffect(() => {
    if (!supabase) return;
    const fetchHomeLogo = async () => {
      try {
        const { data, error } = await supabase.from("site_settings").select("value").eq("key", "home_logo").maybeSingle();
        if (!error && data) {
          setHomeLogoUrl(data.value || "");
        }
      } catch (err) {
        console.error("Erreur lors du chargement du logo d'accueil:", err);
      }
    };
    fetchHomeLogo();
    const subscription = supabase.channel("home_logo_changes").on(
      "postgres_changes",
      {
        event: "*",
        schema: "public",
        table: "site_settings",
        filter: "key=eq.home_logo"
      },
      (payload) => {
        if (payload.new && "value" in payload.new) {
          setHomeLogoUrl(payload.new.value || "");
        }
      }
    ).subscribe();
    return () => {
      subscription.unsubscribe();
    };
  }, []);
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(
      SEOHead,
      {
        title: "Taxi conventionne CPAM & VSL Paris Ile-de-France | Reservation 24h/24",
        description: "Taxi conventionne CPAM et VSL a Paris et en Ile-de-France (75, 91, 92, 93, 94). Transport medical assis sur prescription vers consultations, dialyse, chimiotherapie, radiotherapie et hospitalisations. Reservation 24h/24, 7j/7.",
        jsonLD: [generateJsonLD()]
      }
    ),
    /* @__PURE__ */ jsxs("div", { className: "relative", children: [
      /* @__PURE__ */ jsxs("section", { className: "relative flex items-center py-10 sm:py-20 sm:min-h-[600px] overflow-hidden", "aria-label": "Bannière principale", children: [
        /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600", "aria-hidden": "true" }),
        /* @__PURE__ */ jsx(
          "div",
          {
            className: "absolute inset-0 opacity-20",
            style: {
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
            },
            "aria-hidden": "true"
          }
        ),
        /* @__PURE__ */ jsx("div", { className: "container mx-auto px-4 relative z-10 w-full", children: /* @__PURE__ */ jsxs("div", { className: "max-w-4xl mx-auto text-center text-white", children: [
          /* @__PURE__ */ jsx("div", { className: "inline-block mb-4 sm:mb-6 px-4 sm:px-6 py-1.5 sm:py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20", children: /* @__PURE__ */ jsx("span", { className: "text-xs sm:text-sm font-medium", children: "Service disponible 24h/24, 7j/7" }) }),
          /* @__PURE__ */ jsx("h1", { className: "text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-3 sm:mb-6 leading-tight", children: "Taxi Conventionné & VSL à Paris et en Île-de-France" }),
          /* @__PURE__ */ jsxs("p", { className: "text-sm sm:text-lg md:text-xl mb-5 sm:mb-10 text-white/90 leading-relaxed max-w-3xl mx-auto", children: [
            /* @__PURE__ */ jsx("span", { className: "sm:hidden", children: "Transport médical agréé CPAM — Paris, 91, 92, 93, 94. Remboursé sur prescription." }),
            /* @__PURE__ */ jsx("span", { className: "hidden sm:inline", children: "Transport médical assis agréé Sécurité sociale pour tous les rendez-vous médicaux : consultations, dialyse, chimiothérapie, radiothérapie et hospitalisations. Intervention rapide sur Paris (75), Essonne (91), Hauts-de-Seine (92), Seine-Saint-Denis (93) et Val-de-Marne (94)." })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex flex-col sm:flex-row flex-wrap justify-center gap-3 sm:gap-4", children: [
            /* @__PURE__ */ jsxs(
              Link,
              {
                to: "/reservation-taxi-vsl",
                className: "group w-full sm:w-auto bg-white text-blue-600 px-6 sm:px-8 py-3.5 sm:py-4 rounded-xl font-bold text-base sm:text-lg hover:bg-blue-50 transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2 focus:outline-none focus:ring-4 focus:ring-blue-300 active:scale-95 min-h-[48px]",
                "aria-label": "Réserver un taxi VSL maintenant",
                children: [
                  "Réserver maintenant",
                  /* @__PURE__ */ jsx(ArrowRight, { className: "group-hover:translate-x-1 transition-transform", size: 18, "aria-hidden": "true" })
                ]
              }
            ),
            /* @__PURE__ */ jsxs(
              "a",
              {
                href: "tel:0650366491",
                className: "w-full sm:w-auto bg-white/15 backdrop-blur-sm border-2 border-white text-white px-6 sm:px-8 py-3.5 sm:py-4 rounded-xl font-bold text-base sm:text-lg hover:bg-white hover:text-blue-600 transition-all shadow-lg flex items-center justify-center gap-2 focus:outline-none focus:ring-4 focus:ring-white/50 min-h-[48px]",
                "aria-label": "Appeler le 06 50 36 64 91",
                children: [
                  /* @__PURE__ */ jsx(Phone, { size: 18, "aria-hidden": "true" }),
                  "06 50 36 64 91"
                ]
              }
            )
          ] })
        ] }) }),
        /* @__PURE__ */ jsx("div", { className: "absolute bottom-0 left-0 right-0 h-16 sm:h-24 bg-gradient-to-t from-gray-50 to-transparent", "aria-hidden": "true" })
      ] }),
      /* @__PURE__ */ jsx("section", { className: "py-12 sm:py-20 bg-gray-50", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-4", children: [
        /* @__PURE__ */ jsxs("div", { className: "text-center mb-10 sm:mb-16", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-2xl sm:text-4xl md:text-5xl font-bold text-gray-800 mb-2 sm:mb-4 leading-tight", children: "Transport médical en Taxi Conventionné & VSL" }),
          /* @__PURE__ */ jsx("p", { className: "text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl mx-auto", children: "Des solutions fiables et confortables pour vos déplacements de santé en Île-de-France." })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8", children: [
          /* @__PURE__ */ jsxs("div", { className: "bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-shadow", children: [
            /* @__PURE__ */ jsx("div", { className: "flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full mb-4", children: /* @__PURE__ */ jsx(Car, { className: "text-blue-500", size: 24 }) }),
            /* @__PURE__ */ jsx("h3", { className: "text-lg sm:text-xl font-bold text-gray-800 mb-3", children: "Taxi Conventionné" }),
            /* @__PURE__ */ jsx("p", { className: "text-sm sm:text-base text-gray-600", children: "Véhicules agréés CPAM pour tous vos déplacements médicaux sur prescription." })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-shadow", children: [
            /* @__PURE__ */ jsx("div", { className: "flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full mb-4", children: /* @__PURE__ */ jsx(Shield, { className: "text-blue-500", size: 24 }) }),
            /* @__PURE__ */ jsx("h3", { className: "text-lg sm:text-xl font-bold text-gray-800 mb-3", children: "Prise en Charge CPAM" }),
            /* @__PURE__ */ jsx("p", { className: "text-sm sm:text-base text-gray-600", children: "Tiers payant disponible. Nous gérons directement avec votre caisse d'assurance maladie." })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-shadow", children: [
            /* @__PURE__ */ jsx("div", { className: "flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full mb-4", children: /* @__PURE__ */ jsx(Clock, { className: "text-blue-500", size: 24 }) }),
            /* @__PURE__ */ jsx("h3", { className: "text-lg sm:text-xl font-bold text-gray-800 mb-3", children: "Disponible 24/7" }),
            /* @__PURE__ */ jsx("p", { className: "text-sm sm:text-base text-gray-600", children: "Service d'urgence et rendez-vous programmés. Nous sommes là quand vous avez besoin de nous." })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-shadow", children: [
            /* @__PURE__ */ jsx("div", { className: "flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full mb-4", children: /* @__PURE__ */ jsx(Star, { className: "text-blue-500", size: 24 }) }),
            /* @__PURE__ */ jsx("h3", { className: "text-lg sm:text-xl font-bold text-gray-800 mb-3", children: "Chauffeurs Formés" }),
            /* @__PURE__ */ jsx("p", { className: "text-sm sm:text-base text-gray-600", children: "Professionnels expérimentés dans le transport médical, à votre écoute et bienveillants." })
          ] })
        ] })
      ] }) }),
      /* @__PURE__ */ jsx("section", { className: "py-12 sm:py-20 bg-white", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-4", children: [
        /* @__PURE__ */ jsxs("div", { className: "text-center mb-10 sm:mb-16", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-2xl sm:text-4xl md:text-5xl font-bold text-gray-800 mb-2 sm:mb-4", children: "Nos Services de Transport Médical" }),
          /* @__PURE__ */ jsx("p", { className: "text-base sm:text-lg text-gray-600 max-w-2xl mx-auto", children: "Un service complet pour tous vos besoins de déplacements médicaux" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8", children: [
          /* @__PURE__ */ jsxs("div", { className: "border border-gray-200 rounded-xl p-6 hover:border-blue-500 hover:shadow-lg transition-all", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 mb-4", children: [
              /* @__PURE__ */ jsx(CheckCircle, { className: "text-blue-500 flex-shrink-0", size: 24 }),
              /* @__PURE__ */ jsx("h3", { className: "text-lg font-bold text-gray-800", children: "Consultations Médicales" })
            ] }),
            /* @__PURE__ */ jsx("p", { className: "text-sm sm:text-base text-gray-600", children: "Transport vers vos rendez-vous médicaux, examens de routine, consultations spécialisées." })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "border border-gray-200 rounded-xl p-6 hover:border-blue-500 hover:shadow-lg transition-all", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 mb-4", children: [
              /* @__PURE__ */ jsx(CheckCircle, { className: "text-blue-500 flex-shrink-0", size: 24 }),
              /* @__PURE__ */ jsx("h3", { className: "text-lg font-bold text-gray-800", children: "Dialyse" })
            ] }),
            /* @__PURE__ */ jsx("p", { className: "text-sm sm:text-base text-gray-600", children: "Trajets réguliers vers votre centre de dialyse avec ponctualité et confort garantis." })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "border border-gray-200 rounded-xl p-6 hover:border-blue-500 hover:shadow-lg transition-all", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 mb-4", children: [
              /* @__PURE__ */ jsx(CheckCircle, { className: "text-blue-500 flex-shrink-0", size: 24 }),
              /* @__PURE__ */ jsx("h3", { className: "text-lg font-bold text-gray-800", children: "Chimiothérapie" })
            ] }),
            /* @__PURE__ */ jsx("p", { className: "text-sm sm:text-base text-gray-600", children: "Transport adapté et sécurisé pour vos séances de chimiothérapie en toute sérénité." })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "border border-gray-200 rounded-xl p-6 hover:border-blue-500 hover:shadow-lg transition-all", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 mb-4", children: [
              /* @__PURE__ */ jsx(CheckCircle, { className: "text-blue-500 flex-shrink-0", size: 24 }),
              /* @__PURE__ */ jsx("h3", { className: "text-lg font-bold text-gray-800", children: "Radiothérapie" })
            ] }),
            /* @__PURE__ */ jsx("p", { className: "text-sm sm:text-base text-gray-600", children: "Accompagnement régulier pour vos séances de radiothérapie avec respect et discrétion." })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "border border-gray-200 rounded-xl p-6 hover:border-blue-500 hover:shadow-lg transition-all", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 mb-4", children: [
              /* @__PURE__ */ jsx(CheckCircle, { className: "text-blue-500 flex-shrink-0", size: 24 }),
              /* @__PURE__ */ jsx("h3", { className: "text-lg font-bold text-gray-800", children: "Hospitalisations" })
            ] }),
            /* @__PURE__ */ jsx("p", { className: "text-sm sm:text-base text-gray-600", children: "Transport sécurisé pour vos admissions, sorties d'hôpital et transferts entre établissements." })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "border border-gray-200 rounded-xl p-6 hover:border-blue-500 hover:shadow-lg transition-all", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 mb-4", children: [
              /* @__PURE__ */ jsx(CheckCircle, { className: "text-blue-500 flex-shrink-0", size: 24 }),
              /* @__PURE__ */ jsx("h3", { className: "text-lg font-bold text-gray-800", children: "Examens & Analyses" })
            ] }),
            /* @__PURE__ */ jsx("p", { className: "text-sm sm:text-base text-gray-600", children: "Déplacements pour vos examens médicaux, IRM, scanner, radiographies et prises de sang." })
          ] })
        ] })
      ] }) }),
      /* @__PURE__ */ jsx("section", { className: "py-12 sm:py-20 bg-blue-50", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-4", children: [
        /* @__PURE__ */ jsxs("div", { className: "text-center mb-10 sm:mb-16", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-2xl sm:text-4xl md:text-5xl font-bold text-gray-800 mb-2 sm:mb-4", children: "Pourquoi Choisir Notre Service ?" }),
          /* @__PURE__ */ jsx("p", { className: "text-base sm:text-lg text-gray-600 max-w-2xl mx-auto", children: "Des garanties solides pour votre tranquillité d'esprit" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto", children: [
          /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-xl p-6 shadow-md", children: [
            /* @__PURE__ */ jsx("div", { className: "text-blue-500 mb-4", children: /* @__PURE__ */ jsx(Shield, { size: 32 }) }),
            /* @__PURE__ */ jsx("h3", { className: "text-lg font-bold text-gray-800 mb-3", children: "Agrément CPAM" }),
            /* @__PURE__ */ jsx("p", { className: "text-sm sm:text-base text-gray-600", children: "Nos véhicules et chauffeurs sont agréés par l'Assurance Maladie pour le transport médical conventionné." })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-xl p-6 shadow-md", children: [
            /* @__PURE__ */ jsx("div", { className: "text-blue-500 mb-4", children: /* @__PURE__ */ jsx(CheckCircle, { size: 32 }) }),
            /* @__PURE__ */ jsx("h3", { className: "text-lg font-bold text-gray-800 mb-3", children: "Ponctualité Garantie" }),
            /* @__PURE__ */ jsx("p", { className: "text-sm sm:text-base text-gray-600", children: "Nous comprenons l'importance de vos rendez-vous médicaux. Arrivée à l'heure à chaque fois." })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-xl p-6 shadow-md", children: [
            /* @__PURE__ */ jsx("div", { className: "text-blue-500 mb-4", children: /* @__PURE__ */ jsx(Star, { size: 32 }) }),
            /* @__PURE__ */ jsx("h3", { className: "text-lg font-bold text-gray-800 mb-3", children: "Véhicules Confortables" }),
            /* @__PURE__ */ jsx("p", { className: "text-sm sm:text-base text-gray-600", children: "Flotte récente, climatisée et régulièrement entretenue pour votre confort et sécurité." })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-xl p-6 shadow-md", children: [
            /* @__PURE__ */ jsx("div", { className: "text-blue-500 mb-4", children: /* @__PURE__ */ jsx(MapPin, { size: 32 }) }),
            /* @__PURE__ */ jsx("h3", { className: "text-lg font-bold text-gray-800 mb-3", children: "Couverture Complète" }),
            /* @__PURE__ */ jsx("p", { className: "text-sm sm:text-base text-gray-600", children: "Service disponible sur 193 villes d'Île-de-France : Paris (75), Essonne (91), Hauts-de-Seine (92), Seine-Saint-Denis (93), Val-de-Marne (94)." })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-xl p-6 shadow-md", children: [
            /* @__PURE__ */ jsx("div", { className: "text-blue-500 mb-4", children: /* @__PURE__ */ jsx(Clock, { size: 32 }) }),
            /* @__PURE__ */ jsx("h3", { className: "text-lg font-bold text-gray-800 mb-3", children: "Disponibilité 24/7" }),
            /* @__PURE__ */ jsx("p", { className: "text-sm sm:text-base text-gray-600", children: "Réservation et service d'urgence 24 heures sur 24, 7 jours sur 7, week-ends et jours fériés inclus." })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-xl p-6 shadow-md", children: [
            /* @__PURE__ */ jsx("div", { className: "text-blue-500 mb-4", children: /* @__PURE__ */ jsx(Phone, { size: 32 }) }),
            /* @__PURE__ */ jsx("h3", { className: "text-lg font-bold text-gray-800 mb-3", children: "Réservation Simple" }),
            /* @__PURE__ */ jsx("p", { className: "text-sm sm:text-base text-gray-600", children: "Réservez en ligne ou par téléphone. Confirmation immédiate et suivi en temps réel de votre course." })
          ] })
        ] })
      ] }) }),
      /* @__PURE__ */ jsx("section", { className: "py-12 sm:py-20 bg-white", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-4", children: [
        /* @__PURE__ */ jsxs("div", { className: "text-center mb-10 sm:mb-16", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-2xl sm:text-4xl md:text-5xl font-bold text-gray-800 mb-2 sm:mb-4", children: "193 Villes Desservies en Île-de-France" }),
          /* @__PURE__ */ jsx("p", { className: "text-base sm:text-lg text-gray-600 max-w-2xl mx-auto", children: "Une couverture complète pour votre tranquillité" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6", children: [
          /* @__PURE__ */ jsxs(
            Link,
            {
              to: "/taxi-conventionne-paris-75",
              className: "bg-gradient-to-br from-blue-500 to-blue-600 text-white p-6 rounded-xl hover:shadow-xl transition-all group",
              children: [
                /* @__PURE__ */ jsx(MapPin, { className: "mb-3 group-hover:scale-110 transition-transform", size: 32 }),
                /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold mb-2", children: "Paris (75)" }),
                /* @__PURE__ */ jsx("p", { className: "text-sm text-blue-100 mb-3", children: "20 arrondissements" }),
                /* @__PURE__ */ jsxs("span", { className: "text-sm font-medium flex items-center justify-center gap-2", children: [
                  "Voir les arrondissements",
                  /* @__PURE__ */ jsx(ArrowRight, { size: 16, className: "group-hover:translate-x-1 transition-transform" })
                ] })
              ]
            }
          ),
          /* @__PURE__ */ jsxs(
            Link,
            {
              to: "/taxi-conventionne-essonne-91",
              className: "bg-gradient-to-br from-green-500 to-green-600 text-white p-6 rounded-xl hover:shadow-xl transition-all group",
              children: [
                /* @__PURE__ */ jsx(MapPin, { className: "mb-3 group-hover:scale-110 transition-transform", size: 32 }),
                /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold mb-2", children: "Essonne (91)" }),
                /* @__PURE__ */ jsx("p", { className: "text-sm text-green-100 mb-3", children: "50 villes" }),
                /* @__PURE__ */ jsxs("span", { className: "text-sm font-medium flex items-center justify-center gap-2", children: [
                  "Voir les villes",
                  /* @__PURE__ */ jsx(ArrowRight, { size: 16, className: "group-hover:translate-x-1 transition-transform" })
                ] })
              ]
            }
          ),
          /* @__PURE__ */ jsxs(
            Link,
            {
              to: "/taxi-conventionne-hauts-de-seine-92",
              className: "bg-gradient-to-br from-purple-500 to-purple-600 text-white p-6 rounded-xl hover:shadow-xl transition-all group",
              children: [
                /* @__PURE__ */ jsx(MapPin, { className: "mb-3 group-hover:scale-110 transition-transform", size: 32 }),
                /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold mb-2", children: "Hauts-de-Seine (92)" }),
                /* @__PURE__ */ jsx("p", { className: "text-sm text-purple-100 mb-3", children: "36 communes" }),
                /* @__PURE__ */ jsxs("span", { className: "text-sm font-medium flex items-center justify-center gap-2", children: [
                  "Voir les communes",
                  /* @__PURE__ */ jsx(ArrowRight, { size: 16, className: "group-hover:translate-x-1 transition-transform" })
                ] })
              ]
            }
          ),
          /* @__PURE__ */ jsxs(
            Link,
            {
              to: "/taxi-conventionne-seine-saint-denis-93",
              className: "bg-gradient-to-br from-orange-500 to-orange-600 text-white p-6 rounded-xl hover:shadow-xl transition-all group",
              children: [
                /* @__PURE__ */ jsx(MapPin, { className: "mb-3 group-hover:scale-110 transition-transform", size: 32 }),
                /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold mb-2", children: "Seine-Saint-Denis (93)" }),
                /* @__PURE__ */ jsx("p", { className: "text-sm text-orange-100 mb-3", children: "40 communes" }),
                /* @__PURE__ */ jsxs("span", { className: "text-sm font-medium flex items-center justify-center gap-2", children: [
                  "Voir les communes",
                  /* @__PURE__ */ jsx(ArrowRight, { size: 16, className: "group-hover:translate-x-1 transition-transform" })
                ] })
              ]
            }
          ),
          /* @__PURE__ */ jsxs(
            Link,
            {
              to: "/taxi-conventionne-val-de-marne-94",
              className: "bg-gradient-to-br from-red-500 to-red-600 text-white p-6 rounded-xl hover:shadow-xl transition-all group",
              children: [
                /* @__PURE__ */ jsx(MapPin, { className: "mb-3 group-hover:scale-110 transition-transform", size: 32 }),
                /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold mb-2", children: "Val-de-Marne (94)" }),
                /* @__PURE__ */ jsx("p", { className: "text-sm text-red-100 mb-3", children: "47 communes" }),
                /* @__PURE__ */ jsxs("span", { className: "text-sm font-medium flex items-center justify-center gap-2", children: [
                  "Voir les communes",
                  /* @__PURE__ */ jsx(ArrowRight, { size: 16, className: "group-hover:translate-x-1 transition-transform" })
                ] })
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsx("div", { className: "text-center mt-10", children: /* @__PURE__ */ jsxs(
          Link,
          {
            to: "/zones-desservies",
            className: "inline-flex items-center gap-2 bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors font-medium",
            children: [
              /* @__PURE__ */ jsx("span", { children: "Voir toutes les villes desservies" }),
              /* @__PURE__ */ jsx(ArrowRight, { size: 18 })
            ]
          }
        ) })
      ] }) }),
      /* @__PURE__ */ jsx("section", { className: "py-12 sm:py-20 bg-gray-50", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-4", children: [
        /* @__PURE__ */ jsxs("div", { className: "text-center mb-10 sm:mb-16", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-2xl sm:text-4xl md:text-5xl font-bold text-gray-800 mb-2 sm:mb-4", children: "Questions Fréquentes" }),
          /* @__PURE__ */ jsx("p", { className: "text-base sm:text-lg text-gray-600 max-w-2xl mx-auto", children: "Tout ce que vous devez savoir sur nos services" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "max-w-4xl mx-auto space-y-4", children: [
          /* @__PURE__ */ jsxs("details", { className: "bg-white rounded-xl p-6 shadow-md group", children: [
            /* @__PURE__ */ jsxs("summary", { className: "font-bold text-gray-800 cursor-pointer list-none flex items-center justify-between", children: [
              /* @__PURE__ */ jsx("span", { children: "Comment réserver un taxi conventionné ?" }),
              /* @__PURE__ */ jsx("span", { className: "text-blue-500 group-open:rotate-180 transition-transform", children: "▼" })
            ] }),
            /* @__PURE__ */ jsx("p", { className: "mt-4 text-gray-600 leading-relaxed", children: "Vous pouvez réserver en ligne via notre formulaire de réservation ou par téléphone au 06 50 36 64 91. Nous vous demanderons votre prescription médicale, votre carte Vitale et les détails de votre rendez-vous." })
          ] }),
          /* @__PURE__ */ jsxs("details", { className: "bg-white rounded-xl p-6 shadow-md group", children: [
            /* @__PURE__ */ jsxs("summary", { className: "font-bold text-gray-800 cursor-pointer list-none flex items-center justify-between", children: [
              /* @__PURE__ */ jsx("span", { children: "Quels documents dois-je fournir ?" }),
              /* @__PURE__ */ jsx("span", { className: "text-blue-500 group-open:rotate-180 transition-transform", children: "▼" })
            ] }),
            /* @__PURE__ */ jsx("p", { className: "mt-4 text-gray-600 leading-relaxed", children: "Vous aurez besoin d'une prescription médicale de transport (ordonnance), votre carte Vitale à jour, et éventuellement votre carte de mutuelle. Le chauffeur vérifiera ces documents avant le départ." })
          ] }),
          /* @__PURE__ */ jsxs("details", { className: "bg-white rounded-xl p-6 shadow-md group", children: [
            /* @__PURE__ */ jsxs("summary", { className: "font-bold text-gray-800 cursor-pointer list-none flex items-center justify-between", children: [
              /* @__PURE__ */ jsx("span", { children: "Le tiers payant est-il disponible ?" }),
              /* @__PURE__ */ jsx("span", { className: "text-blue-500 group-open:rotate-180 transition-transform", children: "▼" })
            ] }),
            /* @__PURE__ */ jsx("p", { className: "mt-4 text-gray-600 leading-relaxed", children: "Oui, nous proposons le tiers payant. Vous n'avez pas à avancer les frais, nous nous chargeons directement du remboursement avec votre caisse d'assurance maladie et votre mutuelle." })
          ] }),
          /* @__PURE__ */ jsxs("details", { className: "bg-white rounded-xl p-6 shadow-md group", children: [
            /* @__PURE__ */ jsxs("summary", { className: "font-bold text-gray-800 cursor-pointer list-none flex items-center justify-between", children: [
              /* @__PURE__ */ jsx("span", { children: "Puis-je réserver pour un proche ?" }),
              /* @__PURE__ */ jsx("span", { className: "text-blue-500 group-open:rotate-180 transition-transform", children: "▼" })
            ] }),
            /* @__PURE__ */ jsx("p", { className: "mt-4 text-gray-600 leading-relaxed", children: "Absolument. Vous pouvez réserver un transport pour un membre de votre famille ou un proche. Assurez-vous simplement d'avoir toutes les informations nécessaires (prescription, carte Vitale du patient)." })
          ] }),
          /* @__PURE__ */ jsxs("details", { className: "bg-white rounded-xl p-6 shadow-md group", children: [
            /* @__PURE__ */ jsxs("summary", { className: "font-bold text-gray-800 cursor-pointer list-none flex items-center justify-between", children: [
              /* @__PURE__ */ jsx("span", { children: "Combien de temps à l'avance dois-je réserver ?" }),
              /* @__PURE__ */ jsx("span", { className: "text-blue-500 group-open:rotate-180 transition-transform", children: "▼" })
            ] }),
            /* @__PURE__ */ jsx("p", { className: "mt-4 text-gray-600 leading-relaxed", children: "Pour les rendez-vous programmés, nous recommandons de réserver 24 à 48 heures à l'avance. Pour les urgences, nous faisons notre maximum pour intervenir dans les plus brefs délais." })
          ] }),
          /* @__PURE__ */ jsxs("details", { className: "bg-white rounded-xl p-6 shadow-md group", children: [
            /* @__PURE__ */ jsxs("summary", { className: "font-bold text-gray-800 cursor-pointer list-none flex items-center justify-between", children: [
              /* @__PURE__ */ jsx("span", { children: "Couvrez-vous les trajets vers les aéroports et gares ?" }),
              /* @__PURE__ */ jsx("span", { className: "text-blue-500 group-open:rotate-180 transition-transform", children: "▼" })
            ] }),
            /* @__PURE__ */ jsx("p", { className: "mt-4 text-gray-600 leading-relaxed", children: "Oui, nous assurons les transferts médicaux vers tous les aéroports parisiens (CDG, Orly, Beauvais) et toutes les gares (Gare du Nord, Gare de Lyon, Gare Montparnasse, etc.) dans le cadre de déplacements médicaux prescrits." })
          ] })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "text-center mt-10", children: /* @__PURE__ */ jsxs(
          Link,
          {
            to: "/faq",
            className: "inline-flex items-center gap-2 text-blue-500 hover:text-blue-600 font-medium",
            children: [
              /* @__PURE__ */ jsx("span", { children: "Voir toutes les questions" }),
              /* @__PURE__ */ jsx(ArrowRight, { size: 18 })
            ]
          }
        ) })
      ] }) }),
      /* @__PURE__ */ jsx("section", { className: "py-12 sm:py-20 bg-gradient-to-br from-blue-500 to-blue-600 text-white", children: /* @__PURE__ */ jsx("div", { className: "container mx-auto px-4", children: /* @__PURE__ */ jsxs("div", { className: "max-w-4xl mx-auto text-center", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-2xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6", children: "Besoin d'un Transport Médical ?" }),
        /* @__PURE__ */ jsx("p", { className: "text-base sm:text-xl mb-8 sm:mb-10 text-blue-50", children: "Réservez dès maintenant votre taxi conventionné ou appelez-nous pour toute question. Notre équipe est à votre écoute 24h/24 et 7j/7." }),
        /* @__PURE__ */ jsxs("div", { className: "flex flex-col sm:flex-row gap-4 justify-center", children: [
          /* @__PURE__ */ jsxs(
            Link,
            {
              to: "/reservation-taxi-vsl",
              className: "bg-white text-blue-500 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-blue-50 transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2",
              children: [
                /* @__PURE__ */ jsx("span", { children: "Réserver en ligne" }),
                /* @__PURE__ */ jsx(ArrowRight, { size: 18 })
              ]
            }
          ),
          /* @__PURE__ */ jsxs(
            "a",
            {
              href: "tel:0650366491",
              className: "bg-blue-400 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-blue-300 transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2",
              children: [
                /* @__PURE__ */ jsx(Phone, { size: 18 }),
                /* @__PURE__ */ jsx("span", { children: "06 50 36 64 91" })
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "mt-8 sm:mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 text-left", children: [
          /* @__PURE__ */ jsxs("div", { className: "bg-white/10 backdrop-blur-sm rounded-xl p-6", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 mb-3", children: [
              /* @__PURE__ */ jsx(Clock, { size: 24 }),
              /* @__PURE__ */ jsx("h3", { className: "font-bold text-lg", children: "Disponibilité" })
            ] }),
            /* @__PURE__ */ jsx("p", { className: "text-blue-50", children: "24h/24, 7j/7, jours fériés inclus" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "bg-white/10 backdrop-blur-sm rounded-xl p-6", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 mb-3", children: [
              /* @__PURE__ */ jsx(MapPin, { size: 24 }),
              /* @__PURE__ */ jsx("h3", { className: "font-bold text-lg", children: "Zone Couverte" })
            ] }),
            /* @__PURE__ */ jsx("p", { className: "text-blue-50", children: "193 villes en Île-de-France" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "bg-white/10 backdrop-blur-sm rounded-xl p-6", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 mb-3", children: [
              /* @__PURE__ */ jsx(Shield, { size: 24 }),
              /* @__PURE__ */ jsx("h3", { className: "font-bold text-lg", children: "Agréments" })
            ] }),
            /* @__PURE__ */ jsx("p", { className: "text-blue-50", children: "CPAM, tiers payant disponible" })
          ] })
        ] })
      ] }) }) })
    ] })
  ] });
}
const VALID_DEPARTMENTS = ["75", "77", "78", "91", "92", "93", "94", "95", "60", "28"];
async function fetchHereAutocomplete(query, apiKey) {
  if (!query || query.length < 3) {
    return [];
  }
  if (!apiKey || apiKey === "votre_clé_here_api") {
    console.error("HERE Maps API key is missing or not configured. Please set VITE_HERE_API_KEY in .env file");
    return [];
  }
  try {
    const bbox = "0.8000,47.9000,4.2000,50.1000";
    const url = new URL("https://autosuggest.search.hereapi.com/v1/autosuggest");
    url.searchParams.set("q", query);
    url.searchParams.set("limit", "5");
    url.searchParams.set("lang", "fr");
    url.searchParams.append("in", "countryCode:FRA");
    url.searchParams.append("in", `bbox:${bbox}`);
    url.searchParams.set("apiKey", apiKey);
    const response = await fetch(url.toString());
    if (!response.ok) {
      const errorText = await response.text();
      console.error("HERE Autosuggest API error:", response.status, response.statusText, errorText);
      return [];
    }
    const data = await response.json();
    if (!data.items || !Array.isArray(data.items)) {
      return [];
    }
    const suggestions = data.items.filter((item) => {
      if (!item.address) return false;
      const label = item.address.label || "";
      const postalCode = item.address.postalCode || "";
      const postalCodeMatch = label.match(/\b(\d{5})\b/);
      const foundPostalCode = postalCode || (postalCodeMatch ? postalCodeMatch[1] : "");
      if (!foundPostalCode) return true;
      const department = foundPostalCode.substring(0, 2);
      return VALID_DEPARTMENTS.includes(department);
    }).map((item) => {
      const label = item.address.label || "";
      const postalCodeMatch = label.match(/\b(\d{5})\b/);
      const postalCode = item.address.postalCode || (postalCodeMatch ? postalCodeMatch[1] : "");
      return {
        id: item.id,
        title: item.title,
        address: {
          label: item.address.label,
          countryCode: item.address.countryCode || "FRA",
          postalCode,
          city: item.address.city
        },
        resultType: item.resultType
      };
    });
    return suggestions;
  } catch (error) {
    console.error("Error fetching HERE autocomplete:", error);
    return [];
  }
}
function debounce(func, delay) {
  let timeoutId;
  return function(...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func(...args);
    }, delay);
  };
}
async function geocodeAddress(address, apiKey) {
  var _a2;
  if (!address || address.trim().length === 0) {
    return null;
  }
  try {
    const url = new URL("https://geocode.search.hereapi.com/v1/geocode");
    url.searchParams.set("q", address);
    url.searchParams.set("in", "countryCode:FRA");
    url.searchParams.set("lang", "fr");
    url.searchParams.set("apiKey", apiKey);
    const response = await fetch(url.toString());
    if (!response.ok) {
      console.error("HERE Geocode API error:", response.status, response.statusText);
      return null;
    }
    const data = await response.json();
    if (!data.items || data.items.length === 0) {
      console.warn("No geocoding results found for:", address);
      return null;
    }
    const item = data.items[0];
    const position = item.position;
    const fullAddress = ((_a2 = item.address) == null ? void 0 : _a2.label) || address;
    return {
      address: fullAddress,
      coordinates: {
        lat: position.lat,
        lng: position.lng
      }
    };
  } catch (error) {
    console.error("Error geocoding address:", error);
    return null;
  }
}
async function calculateRoute(originLat, originLng, destLat, destLng, apiKey, departureDate, departureTime) {
  if (!originLat || !originLng || !destLat || !destLng) {
    return null;
  }
  try {
    const url = new URL("https://router.hereapi.com/v8/routes");
    url.searchParams.set("transportMode", "car");
    url.searchParams.set("origin", `${originLat},${originLng}`);
    url.searchParams.set("destination", `${destLat},${destLng}`);
    url.searchParams.set("return", "summary");
    let departureDateTime;
    if (departureDate && departureTime) {
      departureDateTime = `${departureDate}T${departureTime}:00`;
    } else {
      departureDateTime = (/* @__PURE__ */ new Date()).toISOString();
    }
    url.searchParams.set("departureTime", departureDateTime);
    url.searchParams.set("apiKey", apiKey);
    const response = await fetch(url.toString());
    if (!response.ok) {
      console.error("HERE Routing API error:", response.status, response.statusText);
      return null;
    }
    const data = await response.json();
    if (!data.routes || data.routes.length === 0) {
      console.warn("No routes found");
      return null;
    }
    const route = data.routes[0];
    const section = route.sections[0];
    const summary = section.summary;
    const distanceMeters = summary.length;
    const durationSeconds = summary.duration;
    const distanceKm = parseFloat((distanceMeters / 1e3).toFixed(2));
    const durationMinutes = Math.round(durationSeconds / 60);
    return {
      distance_km: distanceKm,
      duree_minutes: durationMinutes
    };
  } catch (error) {
    console.error("Error calculating route:", error);
    return null;
  }
}
function AutocompleteInput({
  label,
  value,
  placeholder,
  required = false,
  apiKey,
  onAddressSelect,
  onInputChange,
  isValidated,
  hasError = false
}) {
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isGeocoding, setIsGeocoding] = useState(false);
  const inputRef = useRef(null);
  const wrapperRef = useRef(null);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  const fetchSuggestions = useCallback(
    async (query) => {
      if (query.length < 3) {
        setSuggestions([]);
        setIsLoading(false);
        return;
      }
      setIsLoading(true);
      try {
        const results = await fetchHereAutocomplete(query, apiKey);
        setSuggestions(results);
      } catch (error) {
        console.error("Error fetching suggestions:", error);
        setSuggestions([]);
      } finally {
        setIsLoading(false);
      }
    },
    [apiKey]
  );
  const debouncedFetchSuggestions = useCallback(
    debounce(fetchSuggestions, 300),
    [fetchSuggestions]
  );
  useEffect(() => {
    if (value.length >= 3) {
      debouncedFetchSuggestions(value);
    } else {
      setSuggestions([]);
    }
  }, [value, debouncedFetchSuggestions]);
  const handleInputChange = (e) => {
    const newValue = e.target.value;
    onInputChange(newValue);
    setShowSuggestions(true);
  };
  const handleSuggestionClick = async (suggestion) => {
    setIsGeocoding(true);
    setShowSuggestions(false);
    try {
      const geocodeResult = await geocodeAddress(suggestion.address.label, apiKey);
      if (geocodeResult) {
        onAddressSelect(
          geocodeResult.address,
          geocodeResult.coordinates.lat,
          geocodeResult.coordinates.lng
        );
        setSuggestions([]);
      } else {
        console.error("Failed to geocode address");
        onInputChange(suggestion.address.label);
      }
    } catch (error) {
      console.error("Error geocoding address:", error);
      onInputChange(suggestion.address.label);
    } finally {
      setIsGeocoding(false);
    }
  };
  const handleFocus = () => {
    if (suggestions.length > 0) {
      setShowSuggestions(true);
    }
  };
  const inputId = `autocomplete-${label.toLowerCase().replace(/\s+/g, "-")}`;
  return /* @__PURE__ */ jsxs("div", { ref: wrapperRef, className: "relative", children: [
    /* @__PURE__ */ jsxs("label", { htmlFor: inputId, className: "block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wide flex items-center gap-1.5", children: [
      /* @__PURE__ */ jsx(MapPin, { size: 12, "aria-hidden": "true", className: "text-gray-400" }),
      label,
      " ",
      required && "*"
    ] }),
    /* @__PURE__ */ jsx(
      "input",
      {
        ref: inputRef,
        type: "text",
        id: inputId,
        value,
        onChange: handleInputChange,
        onFocus: handleFocus,
        required,
        "aria-required": required ? "true" : "false",
        "aria-autocomplete": "list",
        "aria-controls": `${inputId}-suggestions`,
        "aria-expanded": showSuggestions && suggestions.length > 0,
        placeholder,
        disabled: isGeocoding,
        className: `w-full px-4 py-3 border rounded-xl text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${isValidated ? "border-green-400 bg-green-50 text-gray-800" : hasError ? "border-red-400 bg-red-50" : "border-gray-200 bg-gray-50 focus:bg-white"} ${isGeocoding ? "opacity-60 cursor-wait" : ""}`
      }
    ),
    isValidated && /* @__PURE__ */ jsxs("div", { role: "status", "aria-live": "polite", className: "mt-1.5 text-xs text-green-600 flex items-center gap-1 font-medium", children: [
      /* @__PURE__ */ jsx(CheckCircle, { size: 12, "aria-hidden": "true" }),
      " Adresse valide"
    ] }),
    isGeocoding && /* @__PURE__ */ jsxs("div", { role: "status", "aria-live": "polite", className: "mt-1.5 text-xs text-blue-600 flex items-center gap-1.5", children: [
      /* @__PURE__ */ jsx("div", { className: "w-3 h-3 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" }),
      "Vérification en cours…"
    ] }),
    showSuggestions && suggestions.length > 0 && !isGeocoding && /* @__PURE__ */ jsx(
      "ul",
      {
        id: `${inputId}-suggestions`,
        role: "listbox",
        className: "absolute z-50 w-full bg-white border border-gray-200 rounded-xl shadow-xl mt-1.5 max-h-56 overflow-y-auto",
        style: { top: "100%" },
        children: suggestions.map((suggestion) => /* @__PURE__ */ jsxs(
          "li",
          {
            role: "option",
            "aria-selected": false,
            tabIndex: 0,
            onClick: () => handleSuggestionClick(suggestion),
            onKeyDown: (e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                handleSuggestionClick(suggestion);
              }
            },
            className: "flex items-start gap-2.5 px-4 py-3 hover:bg-blue-50 active:bg-blue-100 cursor-pointer border-b border-gray-100 last:border-b-0 transition-colors focus:bg-blue-50 focus:outline-none",
            children: [
              /* @__PURE__ */ jsx(MapPin, { size: 13, className: "text-blue-400 flex-shrink-0 mt-0.5", "aria-hidden": "true" }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("div", { className: "font-semibold text-gray-900 text-sm leading-tight", children: suggestion.title }),
                /* @__PURE__ */ jsx("div", { className: "text-xs text-gray-500 mt-0.5 leading-tight", children: suggestion.address.label })
              ] })
            ]
          },
          suggestion.id
        ))
      }
    ),
    showSuggestions && isLoading && value.length >= 3 && /* @__PURE__ */ jsxs("div", { role: "status", "aria-live": "polite", className: "absolute z-50 w-full bg-white border border-gray-200 rounded-xl shadow-xl mt-1.5 p-4 text-center text-sm text-gray-500 flex items-center justify-center gap-2", children: [
      /* @__PURE__ */ jsx("div", { className: "w-3.5 h-3.5 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" }),
      "Recherche en cours…"
    ] }),
    showSuggestions && !isLoading && suggestions.length === 0 && value.length >= 3 && /* @__PURE__ */ jsx("div", { className: "absolute z-50 w-full bg-white border border-gray-200 rounded-xl shadow-xl mt-1.5 p-4 text-center text-sm text-gray-500", children: "Aucune suggestion — saisir l'adresse complète manuellement" })
  ] });
}
const DEPARTMENTS$2 = [
  { label: "Paris (75)", href: "/taxi-conventionne-paris-75" },
  { label: "Essonne (91)", href: "/taxi-conventionne-essonne-91" },
  { label: "Hauts-de-Seine (92)", href: "/taxi-conventionne-hauts-de-seine-92" },
  { label: "Seine-Saint-Denis (93)", href: "/taxi-conventionne-seine-saint-denis-93" },
  { label: "Val-de-Marne (94)", href: "/taxi-conventionne-val-de-marne-94" }
];
const FAQ_ITEMS$3 = [
  {
    question: "Comment réserver un taxi conventionné VSL ?",
    answer: "Remplissez le formulaire ci-dessus avec vos coordonnées, vos adresses de départ et d'arrivée, la date et l'heure souhaitées. Vous recevrez une confirmation par téléphone dans les plus brefs délais."
  },
  {
    question: "Le transport est-il remboursé par la CPAM ?",
    answer: "Oui, sous certaines conditions : vous devez disposer d'une prescription médicale de transport et votre état de santé doit justifier l'utilisation d'un taxi. La prise en charge peut atteindre 100 % pour les patients en ALD ou en CMU."
  },
  {
    question: "Faut-il une prescription médicale ?",
    answer: "Oui, une prescription médicale (formulaire Cerfa S3138) est obligatoire pour un remboursement CPAM. Sans prescription, le transport reste possible mais non remboursé."
  },
  {
    question: "Quels départements sont couverts ?",
    answer: "Paris (75), Essonne (91), Hauts-de-Seine (92), Seine-Saint-Denis (93) et Val-de-Marne (94). Nous assurons tous types de transports médicaux : consultations, dialyse, chimio, radio, hospitalisations."
  },
  {
    question: "Quel est le délai de confirmation ?",
    answer: "Nous vous contactons par téléphone dans les plus brefs délais. Réservez au minimum 24h à l'avance. Pour les urgences : 06 50 36 64 91."
  }
];
function StepBadge({ n, color }) {
  return /* @__PURE__ */ jsx("span", { className: `flex-shrink-0 w-6 h-6 rounded-full ${color} text-white text-xs font-bold flex items-center justify-center`, children: n });
}
function SectionCard({ step, stepColor, icon, iconBg, title, children }) {
  return /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-2xl border border-gray-100 shadow-sm", children: [
    /* @__PURE__ */ jsxs("div", { className: `flex items-center gap-3 px-4 sm:px-5 py-3.5 border-b border-gray-100 rounded-t-2xl ${iconBg}`, children: [
      /* @__PURE__ */ jsx(StepBadge, { n: step, color: stepColor }),
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
        icon,
        /* @__PURE__ */ jsx("h2", { className: "font-bold text-gray-800 text-sm sm:text-base", children: title })
      ] })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "px-4 sm:px-5 py-4 sm:py-5", children })
  ] });
}
function FieldLabel({ children }) {
  return /* @__PURE__ */ jsx("p", { className: "text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wide", children });
}
function TextInput({ id, name, type = "text", value, onChange, required, placeholder, hasError }) {
  return /* @__PURE__ */ jsx(
    "input",
    {
      type,
      id,
      name,
      value: value ?? "",
      onChange,
      required,
      placeholder,
      className: `w-full px-4 py-3 rounded-xl border text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
        ${hasError ? "border-red-400 bg-red-50" : "border-gray-200 bg-gray-50 focus:bg-white"}`
    }
  );
}
function ErrorMsg({ msg }) {
  if (!msg) return null;
  return /* @__PURE__ */ jsxs("p", { className: "mt-1.5 text-xs text-red-600 font-medium flex items-center gap-1", children: [
    /* @__PURE__ */ jsx(AlertCircle, { size: 11 }),
    msg
  ] });
}
function RadioPill({ name, value, checked, onChange, label, sublabel, required }) {
  return /* @__PURE__ */ jsxs("label", { className: `flex items-center gap-3 cursor-pointer px-4 py-3 rounded-xl border-2 transition-all duration-150 select-none active:scale-[0.98]
      ${checked ? "border-blue-500 bg-blue-50" : "border-gray-200 bg-white hover:border-blue-200 hover:bg-blue-50/30"}`, children: [
    /* @__PURE__ */ jsx("div", { className: `w-5 h-5 rounded-full border-2 flex-shrink-0 flex items-center justify-center transition-colors
        ${checked ? "border-blue-500 bg-blue-500" : "border-gray-300 bg-white"}`, children: checked && /* @__PURE__ */ jsx("div", { className: "w-2 h-2 rounded-full bg-white" }) }),
    /* @__PURE__ */ jsx("input", { type: "radio", name, value, checked, onChange, required, className: "sr-only" }),
    /* @__PURE__ */ jsxs("div", { className: "flex-1 min-w-0", children: [
      /* @__PURE__ */ jsx("span", { className: `block text-sm font-semibold leading-tight ${checked ? "text-blue-800" : "text-gray-700"}`, children: label }),
      sublabel && /* @__PURE__ */ jsx("span", { className: "block text-xs text-gray-400 mt-0.5 leading-tight", children: sublabel })
    ] }),
    checked && /* @__PURE__ */ jsx(CheckCircle, { size: 15, className: "text-blue-500 flex-shrink-0" })
  ] });
}
function ReservationPage() {
  console.log("SSR COMPONENT: Reservation");
  const [formData, setFormData] = useState({
    nom: "",
    prenom: "",
    telephone: "",
    email: "",
    adresse_depart: "",
    adresse_arrivee: "",
    date_rdv: "",
    heure_rdv: "",
    informations_supplementaires: ""
  });
  const [fauteuilRoulant, setFauteuilRoulant] = useState(null);
  const [typeTrajet, setTypeTrajet] = useState(null);
  const [typePriseEnCharge, setTypePriseEnCharge] = useState(null);
  const [situationALD, setSituationALD] = useState(null);
  const [bonTransport, setBonTransport] = useState(null);
  const [distance, setDistance] = useState(null);
  const [durationMinutes, setDurationMinutes] = useState(null);
  const [isCalculating, setIsCalculating] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [error, setError] = useState("");
  const [openFaq, setOpenFaq] = useState(null);
  const [fieldErrors, setFieldErrors] = useState({});
  const [coordsDepart, setCoordsDepart] = useState(null);
  const [coordsArrivee, setCoordsArrivee] = useState(null);
  const apiKey = void 0;
  useEffect(() => {
    if (!coordsDepart || !coordsArrivee) return;
    const id = setTimeout(async () => {
      setIsCalculating(true);
      try {
        const result = await calculateRoute(
          coordsDepart.lat,
          coordsDepart.lng,
          coordsArrivee.lat,
          coordsArrivee.lng,
          apiKey,
          formData.date_rdv,
          formData.heure_rdv
        );
        if (result) {
          setDistance(result.distance_km);
          setDurationMinutes(result.duree_minutes);
        }
      } catch {
      } finally {
        setIsCalculating(false);
      }
    }, 500);
    return () => clearTimeout(id);
  }, [coordsDepart, coordsArrivee, apiKey, formData.date_rdv, formData.heure_rdv]);
  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const clearErr = (k) => setFieldErrors((prev) => ({ ...prev, [k]: void 0 }));
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");
    const errs = {};
    if (!formData.adresse_depart || formData.adresse_depart.trim().length < 5)
      errs.adresse_depart = "Veuillez renseigner l'adresse de départ";
    else if (!coordsDepart)
      errs.adresse_depart = "Sélectionnez une adresse dans les suggestions";
    if (!formData.adresse_arrivee || formData.adresse_arrivee.trim().length < 5)
      errs.adresse_arrivee = "Veuillez renseigner l'adresse d'arrivée";
    else if (!coordsArrivee)
      errs.adresse_arrivee = "Sélectionnez une adresse dans les suggestions";
    if (fauteuilRoulant === null) errs.fauteuil_roulant = "Veuillez indiquer si le patient est en fauteuil roulant";
    if (!typeTrajet) errs.type_trajet = "Veuillez choisir le type de trajet (aller simple ou aller-retour)";
    if (!typePriseEnCharge) errs.type_prise_en_charge = "Veuillez sélectionner le type de prise en charge";
    if (!situationALD) errs.situation_ald = "Veuillez indiquer votre situation ALD / CMU";
    if (!bonTransport) errs.bon_transport = "Veuillez indiquer l'état de votre bon de transport";
    if (Object.keys(errs).length > 0) {
      setFieldErrors(errs);
      setIsSubmitting(false);
      const firstErrorKey = Object.keys(errs)[0];
      const fieldIdMap = {
        adresse_depart: "field-adresse_depart",
        adresse_arrivee: "field-adresse_arrivee",
        fauteuil_roulant: "field-fauteuil_roulant",
        type_trajet: "field-type_trajet",
        type_prise_en_charge: "field-type_prise_en_charge",
        situation_ald: "field-situation_ald",
        bon_transport: "field-bon_transport"
      };
      const targetId = fieldIdMap[firstErrorKey] || "form-error-summary";
      setTimeout(() => {
        const el = document.getElementById(targetId) || document.getElementById("form-error-summary");
        el == null ? void 0 : el.scrollIntoView({ behavior: "smooth", block: "center" });
      }, 50);
      return;
    }
    setFieldErrors({});
    try {
      const emailData = {
        nom: formData.nom,
        prenom: formData.prenom,
        telephone: formData.telephone,
        email: formData.email,
        adresse_depart: formData.adresse_depart,
        adresse_arrivee: formData.adresse_arrivee,
        date_rdv: formData.date_rdv,
        heure_rdv: formData.heure_rdv,
        ald_cmu: situationALD !== "pas_ald",
        prescription_medicale: bonTransport === "deja_etabli",
        numero_vol: "",
        numero_train: "",
        nombre_passagers: 1,
        nombre_bagages: 0,
        distance_km: distance || 0,
        duree_min: durationMinutes || 0,
        message: [
          `Fauteuil roulant: ${fauteuilRoulant ? "Oui" : "Non"}`,
          `Type trajet: ${typeTrajet}`,
          `Prise en charge: ${typePriseEnCharge}`,
          `ALD: ${situationALD}`,
          `Bon transport: ${bonTransport}`,
          formData.informations_supplementaires ? `Note: ${formData.informations_supplementaires}` : ""
        ].filter(Boolean).join(" | "),
        type_trajet: "vsl"
      };
      const resp = await fetch(`${"https://qwsgtmzpirrbnmcbdvue.supabase.co"}/functions/v1/send-reservation-email`, {
        method: "POST",
        headers: { "Content-Type": "application/json", "Authorization": `Bearer ${"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF3c2d0bXpwaXJyYm5tY2JkdnVlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODAyNDUzMjQsImV4cCI6MjA5NTgyMTMyNH0.RFb45xZjY3pDV4QWgr9-ASta84bX09fIcbv7ZZlY_mk"}` },
        body: JSON.stringify(emailData)
      });
      if (!resp.ok) throw new Error("Erreur lors de l'envoi");
      setSubmitSuccess(true);
      setFormData({ nom: "", prenom: "", telephone: "", email: "", adresse_depart: "", adresse_arrivee: "", date_rdv: "", heure_rdv: "", informations_supplementaires: "" });
      setDistance(null);
      setDurationMinutes(null);
      setCoordsDepart(null);
      setCoordsArrivee(null);
      setFauteuilRoulant(null);
      setTypeTrajet(null);
      setTypePriseEnCharge(null);
      setSituationALD(null);
      setBonTransport(null);
      setTimeout(() => setSubmitSuccess(false), 7e3);
    } catch (err) {
      setError(err.message || "Une erreur est survenue. Veuillez réessayer.");
    } finally {
      setIsSubmitting(false);
    }
  };
  const webPageLD = { "@context": "https://schema.org", "@type": "WebPage", "name": "Réservation Taxi Conventionné VSL CPAM | Île-de-France 24/7", "url": "https://www.taxisparis-conventionnes.fr/reservation-taxi-vsl/" };
  const faqLD = { "@context": "https://schema.org", "@type": "FAQPage", "mainEntity": FAQ_ITEMS$3.map((i) => ({ "@type": "Question", "name": i.question, "acceptedAnswer": { "@type": "Answer", "text": i.answer } })) };
  const serviceLD = { "@context": "https://schema.org", "@type": "MedicalBusiness", "name": "Taxis Paris Conventionnés – Réservation VSL", "url": "https://www.taxisparis-conventionnes.fr/reservation-taxi-vsl/", "telephone": "+33650366491" };
  const hasErrors = Object.keys(fieldErrors).length > 0 || !!error;
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(
      SEOHead,
      {
        title: "Réservation Taxi Conventionné VSL CPAM | Île-de-France 24/7",
        description: "Réservez votre taxi conventionné ou VSL en ligne. Transport médical remboursé CPAM. Service 24/7 en Île-de-France (75, 91, 92, 93, 94).",
        keywords: ["réservation taxi conventionné", "réserver VSL", "transport médical réservation", "taxi CPAM en ligne"],
        canonical: "https://www.taxisparis-conventionnes.fr/reservation-taxi-vsl",
        jsonLD: [webPageLD, faqLD, serviceLD]
      }
    ),
    /* @__PURE__ */ jsx("div", { className: "sticky top-0 z-40 bg-blue-700 text-white py-2.5 shadow-md", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-4 flex items-center justify-between gap-3 text-sm", children: [
      /* @__PURE__ */ jsx("span", { className: "font-medium hidden sm:block", children: "Confirmation rapide par téléphone" }),
      /* @__PURE__ */ jsxs(
        "a",
        {
          href: "tel:+33650366491",
          className: "flex items-center gap-2 bg-white text-blue-700 font-bold px-4 py-1.5 rounded-full hover:bg-blue-50 transition-colors text-xs sm:text-sm mx-auto sm:mx-0",
          children: [
            /* @__PURE__ */ jsx(Phone, { size: 14 }),
            " 06 50 36 64 91"
          ]
        }
      )
    ] }) }),
    /* @__PURE__ */ jsx("div", { className: "bg-gradient-to-b from-blue-50 via-white to-gray-50 min-h-screen", children: /* @__PURE__ */ jsx("div", { className: "container mx-auto px-3 sm:px-4 py-6 sm:py-10", children: /* @__PURE__ */ jsxs("div", { className: "max-w-2xl mx-auto", children: [
      /* @__PURE__ */ jsxs("div", { className: "text-center mb-6 sm:mb-8 px-1", children: [
        /* @__PURE__ */ jsxs("div", { className: "inline-flex items-center gap-1.5 bg-blue-100 text-blue-700 text-xs font-bold px-3 py-1.5 rounded-full mb-3 uppercase tracking-wide", children: [
          /* @__PURE__ */ jsx(Shield, { size: 12 }),
          " Transport remboursé CPAM"
        ] }),
        /* @__PURE__ */ jsx("h1", { id: "page-title", className: "text-xl sm:text-3xl font-extrabold text-gray-900 leading-tight mb-2", children: "Réservation taxi conventionné VSL" }),
        /* @__PURE__ */ jsx("p", { className: "text-xs sm:text-sm text-gray-500 max-w-sm mx-auto", children: "Service 24h/24 – 7j/7 en Île-de-France (75, 91, 92, 93, 94)" }),
        /* @__PURE__ */ jsxs("div", { className: "mt-3 flex flex-wrap items-center justify-center gap-3 text-xs", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-1 text-yellow-500", children: [
            [...Array(5)].map((_, i) => /* @__PURE__ */ jsx(Star, { size: 11, className: "fill-yellow-400" }, i)),
            /* @__PURE__ */ jsx("span", { className: "text-gray-500 ml-1", children: "Patients Île-de-France" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-1 text-green-600", children: [
            /* @__PURE__ */ jsx(CheckCircle, { size: 11 }),
            /* @__PURE__ */ jsx("span", { className: "text-gray-500", children: "Chauffeurs agréés CPAM" })
          ] })
        ] })
      ] }),
      submitSuccess && /* @__PURE__ */ jsxs("div", { role: "alert", className: "mb-4 p-4 bg-green-50 border border-green-200 rounded-2xl flex items-start gap-3", children: [
        /* @__PURE__ */ jsx(CheckCircle, { className: "text-green-500 flex-shrink-0 mt-0.5", size: 18 }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("p", { className: "font-bold text-green-800 text-sm", children: "Réservation envoyée !" }),
          /* @__PURE__ */ jsx("p", { className: "text-green-700 text-xs mt-0.5", children: "Nous vous contacterons rapidement pour confirmer votre transport." })
        ] })
      ] }),
      hasErrors && /* @__PURE__ */ jsxs("div", { id: "form-error-summary", role: "alert", className: "mb-4 p-4 bg-red-50 border-2 border-red-200 rounded-2xl", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 mb-2", children: [
          /* @__PURE__ */ jsx(AlertCircle, { className: "text-red-500 flex-shrink-0", size: 16 }),
          /* @__PURE__ */ jsx("p", { className: "font-bold text-red-800 text-sm", children: "Veuillez corriger les erreurs" })
        ] }),
        /* @__PURE__ */ jsxs("ul", { className: "space-y-1 ml-5", children: [
          Object.values(fieldErrors).filter(Boolean).map((msg, i) => /* @__PURE__ */ jsx("li", { className: "text-xs text-red-700 list-disc", children: msg }, i)),
          error && !Object.keys(fieldErrors).length && /* @__PURE__ */ jsx("li", { className: "text-xs text-red-700 list-disc", children: error })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("form", { onSubmit: handleSubmit, className: "space-y-3 sm:space-y-4", "aria-labelledby": "page-title", children: [
        /* @__PURE__ */ jsx(SectionCard, { step: 1, stepColor: "bg-blue-600", icon: /* @__PURE__ */ jsx(User, { size: 16, className: "text-blue-600" }), iconBg: "bg-blue-50", title: "Vos coordonnées", children: /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx(FieldLabel, { children: "Nom *" }),
            /* @__PURE__ */ jsx(TextInput, { id: "nom", name: "nom", value: formData.nom, onChange: handleChange, required: true, placeholder: "Nom" })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx(FieldLabel, { children: "Prénom *" }),
            /* @__PURE__ */ jsx(TextInput, { id: "prenom", name: "prenom", value: formData.prenom, onChange: handleChange, required: true, placeholder: "Prénom" })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx(FieldLabel, { children: "Téléphone *" }),
            /* @__PURE__ */ jsx(TextInput, { id: "telephone", name: "telephone", type: "tel", value: formData.telephone, onChange: handleChange, required: true, placeholder: "06 12 34 56 78" })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx(FieldLabel, { children: "Email" }),
            /* @__PURE__ */ jsx(TextInput, { id: "email", name: "email", type: "email", value: formData.email, onChange: handleChange, placeholder: "Email (facultatif)" })
          ] })
        ] }) }),
        /* @__PURE__ */ jsx(SectionCard, { step: 2, stepColor: "bg-green-600", icon: /* @__PURE__ */ jsx(MapPin, { size: 16, className: "text-green-600" }), iconBg: "bg-green-50", title: "Trajet", children: /* @__PURE__ */ jsxs("div", { className: "space-y-3", children: [
          /* @__PURE__ */ jsxs("div", { id: "field-adresse_depart", children: [
            /* @__PURE__ */ jsx(
              AutocompleteInput,
              {
                label: "Adresse de départ",
                value: formData.adresse_depart || "",
                placeholder: "Ex : Hôpital Cochin, Paris",
                required: true,
                apiKey,
                onAddressSelect: (addr, lat, lng) => {
                  setFormData((p) => ({ ...p, adresse_depart: addr }));
                  setCoordsDepart({ lat, lng });
                  clearErr("adresse_depart");
                },
                onInputChange: (v) => {
                  setFormData((p) => ({ ...p, adresse_depart: v }));
                  setCoordsDepart(null);
                  clearErr("adresse_depart");
                },
                isValidated: !!coordsDepart,
                hasError: !!fieldErrors.adresse_depart
              }
            ),
            /* @__PURE__ */ jsx(ErrorMsg, { msg: fieldErrors.adresse_depart })
          ] }),
          /* @__PURE__ */ jsxs("div", { id: "field-adresse_arrivee", children: [
            /* @__PURE__ */ jsx(
              AutocompleteInput,
              {
                label: "Adresse d'arrivée",
                value: formData.adresse_arrivee || "",
                placeholder: "Ex : Hôpital Necker, Paris",
                required: true,
                apiKey,
                onAddressSelect: (addr, lat, lng) => {
                  setFormData((p) => ({ ...p, adresse_arrivee: addr }));
                  setCoordsArrivee({ lat, lng });
                  clearErr("adresse_arrivee");
                },
                onInputChange: (v) => {
                  setFormData((p) => ({ ...p, adresse_arrivee: v }));
                  setCoordsArrivee(null);
                  clearErr("adresse_arrivee");
                },
                isValidated: !!coordsArrivee,
                hasError: !!fieldErrors.adresse_arrivee
              }
            ),
            /* @__PURE__ */ jsx(ErrorMsg, { msg: fieldErrors.adresse_arrivee })
          ] }),
          isCalculating && /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 text-xs text-gray-500", children: [
            /* @__PURE__ */ jsx("div", { className: "w-3.5 h-3.5 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" }),
            "Calcul en cours…"
          ] }),
          distance !== null && durationMinutes !== null && !isCalculating && /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-2 mt-1", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2.5 bg-blue-50 border border-blue-100 rounded-xl px-3 py-2.5", children: [
              /* @__PURE__ */ jsx("div", { className: "bg-blue-100 p-1.5 rounded-lg", children: /* @__PURE__ */ jsx(Gauge, { size: 14, className: "text-blue-600" }) }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-400", children: "Distance" }),
                /* @__PURE__ */ jsxs("p", { className: "font-bold text-gray-800 text-sm", children: [
                  distance,
                  " km"
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2.5 bg-orange-50 border border-orange-100 rounded-xl px-3 py-2.5", children: [
              /* @__PURE__ */ jsx("div", { className: "bg-orange-100 p-1.5 rounded-lg", children: /* @__PURE__ */ jsx(Timer, { size: 14, className: "text-orange-600" }) }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-400", children: "Durée" }),
                /* @__PURE__ */ jsxs("p", { className: "font-bold text-gray-800 text-sm", children: [
                  durationMinutes,
                  " min"
                ] })
              ] })
            ] })
          ] })
        ] }) }),
        /* @__PURE__ */ jsx(SectionCard, { step: 3, stepColor: "bg-blue-600", icon: /* @__PURE__ */ jsx(Calendar, { size: 16, className: "text-blue-600" }), iconBg: "bg-blue-50", title: "Date & Heure de prise en charge", children: /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx(FieldLabel, { children: "Date *" }),
            /* @__PURE__ */ jsx(TextInput, { id: "date_rdv", name: "date_rdv", type: "date", value: formData.date_rdv, onChange: handleChange, required: true })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx(FieldLabel, { children: "Heure de prise en charge *" }),
            /* @__PURE__ */ jsx(TextInput, { id: "heure_rdv", name: "heure_rdv", type: "time", value: formData.heure_rdv, onChange: handleChange, required: true })
          ] })
        ] }) }),
        /* @__PURE__ */ jsxs(SectionCard, { step: 4, stepColor: "bg-blue-600", icon: /* @__PURE__ */ jsx(Car, { size: 16, className: "text-blue-600" }), iconBg: "bg-blue-50", title: "Véhicule & Mobilité", children: [
          /* @__PURE__ */ jsxs("div", { className: "mb-4", children: [
            /* @__PURE__ */ jsx(FieldLabel, { children: "Type de véhicule" }),
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 px-4 py-3 border-2 border-blue-400 bg-blue-50 rounded-xl", children: [
              /* @__PURE__ */ jsx("div", { className: "bg-blue-100 p-1.5 rounded-lg", children: /* @__PURE__ */ jsx(Car, { size: 15, className: "text-blue-600" }) }),
              /* @__PURE__ */ jsxs("div", { className: "flex-1", children: [
                /* @__PURE__ */ jsx("p", { className: "font-bold text-blue-800 text-sm", children: "Taxi / VSL" }),
                /* @__PURE__ */ jsxs("p", { className: "text-xs text-blue-500 flex items-center gap-1 mt-0.5", children: [
                  /* @__PURE__ */ jsx(Armchair, { size: 11 }),
                  " Position assise"
                ] })
              ] }),
              /* @__PURE__ */ jsx(CheckCircle, { size: 16, className: "text-blue-500" })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { id: "field-fauteuil_roulant", children: [
            /* @__PURE__ */ jsx(FieldLabel, { children: "Fauteuil roulant (PMR) *" }),
            /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-2", children: [
              /* @__PURE__ */ jsx(
                RadioPill,
                {
                  name: "fauteuil_roulant",
                  value: "non",
                  checked: fauteuilRoulant === false,
                  onChange: () => {
                    setFauteuilRoulant(false);
                    clearErr("fauteuil_roulant");
                  },
                  label: "Non",
                  required: true
                }
              ),
              /* @__PURE__ */ jsx(
                RadioPill,
                {
                  name: "fauteuil_roulant",
                  value: "oui",
                  checked: fauteuilRoulant === true,
                  onChange: () => {
                    setFauteuilRoulant(true);
                    clearErr("fauteuil_roulant");
                  },
                  label: "Oui",
                  sublabel: "Patient en fauteuil",
                  required: true
                }
              )
            ] }),
            /* @__PURE__ */ jsx(ErrorMsg, { msg: fieldErrors.fauteuil_roulant })
          ] })
        ] }),
        /* @__PURE__ */ jsx(SectionCard, { step: 5, stepColor: "bg-teal-600", icon: /* @__PURE__ */ jsx(RefreshCw, { size: 16, className: "text-teal-600" }), iconBg: "bg-teal-50", title: "Type de trajet", children: /* @__PURE__ */ jsxs("div", { id: "field-type_trajet", children: [
          /* @__PURE__ */ jsx(FieldLabel, { children: "Type de trajet *" }),
          /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-2", children: [
            /* @__PURE__ */ jsx(
              RadioPill,
              {
                name: "type_trajet",
                value: "aller_simple",
                checked: typeTrajet === "aller_simple",
                onChange: () => {
                  setTypeTrajet("aller_simple");
                  clearErr("type_trajet");
                },
                label: "Aller simple",
                required: true
              }
            ),
            /* @__PURE__ */ jsx(
              RadioPill,
              {
                name: "type_trajet",
                value: "aller_retour",
                checked: typeTrajet === "aller_retour",
                onChange: () => {
                  setTypeTrajet("aller_retour");
                  clearErr("type_trajet");
                },
                label: "Aller-retour",
                required: true
              }
            )
          ] }),
          /* @__PURE__ */ jsx(ErrorMsg, { msg: fieldErrors.type_trajet })
        ] }) }),
        /* @__PURE__ */ jsxs(SectionCard, { step: 7, stepColor: "bg-red-500", icon: /* @__PURE__ */ jsx(ClipboardList, { size: 16, className: "text-red-500" }), iconBg: "bg-red-50", title: "Type de prise en charge", children: [
          /* @__PURE__ */ jsx("div", { id: "field-type_prise_en_charge", className: "grid grid-cols-1 sm:grid-cols-2 gap-2", children: [
            { value: "consultation", label: "Consultation médicale" },
            { value: "hospitalisation_complete", label: "Hospitalisation complète" },
            { value: "hospitalisation_partielle", label: "Hospitalisation partielle" },
            { value: "hospitalisation_ambulatoire", label: "Hospitalisation ambulatoire" },
            { value: "chimiotherapie", label: "Chimiothérapie" },
            { value: "radiotherapie", label: "Radiothérapie" },
            { value: "hemodialyse", label: "Hémodialyse" },
            { value: "autre", label: "Autre motif" }
          ].map((opt) => /* @__PURE__ */ jsx(
            RadioPill,
            {
              name: "type_prise_en_charge",
              value: opt.value,
              checked: typePriseEnCharge === opt.value,
              onChange: () => {
                setTypePriseEnCharge(opt.value);
                clearErr("type_prise_en_charge");
              },
              label: opt.label,
              required: true
            },
            opt.value
          )) }),
          /* @__PURE__ */ jsx(ErrorMsg, { msg: fieldErrors.type_prise_en_charge })
        ] }),
        /* @__PURE__ */ jsxs(SectionCard, { step: 8, stepColor: "bg-blue-600", icon: /* @__PURE__ */ jsx(Shield, { size: 16, className: "text-blue-600" }), iconBg: "bg-blue-50", title: "Situation ALD / CMU", children: [
          /* @__PURE__ */ jsxs("div", { id: "field-situation_ald", className: "grid grid-cols-1 sm:grid-cols-2 gap-2", children: [
            /* @__PURE__ */ jsx(
              RadioPill,
              {
                name: "situation_ald",
                value: "ald_exonerante",
                checked: situationALD === "ald_exonerante",
                onChange: () => {
                  setSituationALD("ald_exonerante");
                  clearErr("situation_ald");
                },
                label: "ALD exonérante",
                sublabel: "Prise en charge à 100 %",
                required: true
              }
            ),
            /* @__PURE__ */ jsx(
              RadioPill,
              {
                name: "situation_ald",
                value: "ald_non_exonerante",
                checked: situationALD === "ald_non_exonerante",
                onChange: () => {
                  setSituationALD("ald_non_exonerante");
                  clearErr("situation_ald");
                },
                label: "ALD non exonérante",
                sublabel: "Prise en charge partielle",
                required: true
              }
            ),
            /* @__PURE__ */ jsx(
              RadioPill,
              {
                name: "situation_ald",
                value: "cmu",
                checked: situationALD === "cmu",
                onChange: () => {
                  setSituationALD("cmu");
                  clearErr("situation_ald");
                },
                label: "CMU / CSS",
                sublabel: "Complémentaire santé solidaire",
                required: true
              }
            ),
            /* @__PURE__ */ jsx(
              RadioPill,
              {
                name: "situation_ald",
                value: "pas_ald",
                checked: situationALD === "pas_ald",
                onChange: () => {
                  setSituationALD("pas_ald");
                  clearErr("situation_ald");
                },
                label: "Pas d'ALD / CMU",
                sublabel: "Sans dispositif particulier",
                required: true
              }
            )
          ] }),
          /* @__PURE__ */ jsx(ErrorMsg, { msg: fieldErrors.situation_ald }),
          /* @__PURE__ */ jsxs("p", { className: "mt-3 text-xs text-gray-400 flex items-start gap-1.5", children: [
            /* @__PURE__ */ jsx(AlertCircle, { size: 11, className: "mt-0.5 flex-shrink-0" }),
            "En cas de doute, consultez votre médecin traitant."
          ] })
        ] }),
        /* @__PURE__ */ jsxs(SectionCard, { step: 9, stepColor: "bg-gray-600", icon: /* @__PURE__ */ jsx(FileText, { size: 16, className: "text-gray-600" }), iconBg: "bg-gray-50", title: "Bon de transport médical", children: [
          /* @__PURE__ */ jsxs("div", { id: "field-bon_transport", className: "space-y-2", children: [
            /* @__PURE__ */ jsx(
              RadioPill,
              {
                name: "bon_transport",
                value: "deja_etabli",
                checked: bonTransport === "deja_etabli",
                onChange: () => {
                  setBonTransport("deja_etabli");
                  clearErr("bon_transport");
                },
                label: "Déjà établi",
                sublabel: "Votre bon est prêt",
                required: true
              }
            ),
            /* @__PURE__ */ jsx(
              RadioPill,
              {
                name: "bon_transport",
                value: "a_etablir",
                checked: bonTransport === "a_etablir",
                onChange: () => {
                  setBonTransport("a_etablir");
                  clearErr("bon_transport");
                },
                label: "À établir",
                sublabel: "À demander à votre médecin",
                required: true
              }
            ),
            /* @__PURE__ */ jsx(
              RadioPill,
              {
                name: "bon_transport",
                value: "sans_bon",
                checked: bonTransport === "sans_bon",
                onChange: () => {
                  setBonTransport("sans_bon");
                  clearErr("bon_transport");
                },
                label: "Sans bon de transport",
                sublabel: "Transport non remboursé",
                required: true
              }
            )
          ] }),
          /* @__PURE__ */ jsx(ErrorMsg, { msg: fieldErrors.bon_transport })
        ] }),
        /* @__PURE__ */ jsx(SectionCard, { step: 10, stepColor: "bg-gray-500", icon: /* @__PURE__ */ jsx(MessageSquare, { size: 16, className: "text-gray-500" }), iconBg: "bg-gray-50", title: "Informations complémentaires", children: /* @__PURE__ */ jsx(
          "textarea",
          {
            name: "informations_supplementaires",
            value: formData.informations_supplementaires,
            onChange: handleChange,
            rows: 3,
            placeholder: "Accompagnant, accès difficile, besoins spécifiques…",
            className: "w-full px-4 py-3 border border-gray-200 bg-gray-50 focus:bg-white rounded-xl text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
          }
        ) }),
        /* @__PURE__ */ jsxs("div", { className: "pt-1 pb-4", children: [
          /* @__PURE__ */ jsxs("p", { className: "text-center text-xs text-gray-400 mb-3 flex items-center justify-center gap-1", children: [
            /* @__PURE__ */ jsx(CheckCircle, { size: 11, className: "text-green-500" }),
            "Tous les champs sont obligatoires"
          ] }),
          /* @__PURE__ */ jsx(
            "button",
            {
              type: "submit",
              disabled: isSubmitting,
              className: "w-full bg-blue-600 hover:bg-blue-700 active:scale-[0.99] text-white py-4 rounded-2xl font-bold text-base transition-all shadow-lg hover:shadow-xl disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center justify-center gap-2",
              children: isSubmitting ? /* @__PURE__ */ jsxs(Fragment, { children: [
                /* @__PURE__ */ jsx("div", { className: "w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" }),
                "Envoi en cours…"
              ] }) : /* @__PURE__ */ jsxs(Fragment, { children: [
                "Confirmer ma réservation ",
                /* @__PURE__ */ jsx(ArrowRight, { size: 18 })
              ] })
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "bg-blue-50 border border-blue-200 rounded-2xl p-4 sm:p-5 mb-8", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("p", { className: "font-bold text-blue-900 text-sm", children: "Besoin d'une réponse immédiate ?" }),
          /* @__PURE__ */ jsx("p", { className: "text-blue-600 text-xs mt-0.5", children: "Disponible 24h/24 – 7j/7" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex gap-2", children: [
          /* @__PURE__ */ jsxs("a", { href: "tel:+33650366491", className: "flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 bg-blue-600 text-white font-bold px-4 py-2.5 rounded-xl hover:bg-blue-700 transition-colors text-xs sm:text-sm", children: [
            /* @__PURE__ */ jsx(Phone, { size: 13 }),
            " Appeler"
          ] }),
          /* @__PURE__ */ jsxs("a", { href: "mailto:contact@taxisparis-conventionnes.fr", className: "flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 text-blue-700 border border-blue-300 font-medium px-4 py-2.5 rounded-xl hover:bg-blue-100 transition-colors text-xs sm:text-sm", children: [
            /* @__PURE__ */ jsx(Mail, { size: 13 }),
            " Email"
          ] })
        ] })
      ] }) }),
      /* @__PURE__ */ jsxs("section", { className: "bg-white rounded-2xl border border-gray-100 shadow-sm p-5 sm:p-8 mb-8", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-xl sm:text-2xl font-bold text-gray-800 mb-5", children: "Taxi conventionné VSL en Île-de-France" }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-5 text-gray-600 text-sm leading-relaxed", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("h3", { className: "font-bold text-gray-800 mb-2", children: "Qu'est-ce qu'un taxi conventionné VSL ?" }),
            /* @__PURE__ */ jsxs("p", { children: [
              "Un ",
              /* @__PURE__ */ jsx("strong", { children: "taxi conventionné" }),
              " est agréé par l'Assurance Maladie (CPAM) pour des transports médicaux remboursés. Il permet aux patients de se rendre à l'hôpital, en séance de dialyse, chimiothérapie ou radiothérapie, avec une prise en charge partielle ou totale."
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("h3", { className: "font-bold text-gray-800 mb-2", children: "Conditions de remboursement" }),
            /* @__PURE__ */ jsx("ul", { className: "space-y-1.5", children: ["Prescription médicale de transport (Cerfa S3138)", "ALD, CSS (ex-CMU-C) ou incapacité justifiée", "Trajet lié à des soins pris en charge par la Sécu"].map((item, i) => /* @__PURE__ */ jsxs("li", { className: "flex items-start gap-2", children: [
              /* @__PURE__ */ jsx(CheckCircle, { size: 13, className: "text-green-500 flex-shrink-0 mt-0.5" }),
              /* @__PURE__ */ jsx("span", { children: item })
            ] }, i)) })
          ] }),
          /* @__PURE__ */ jsx("nav", { "aria-label": "Départements desservis", className: "grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1", children: DEPARTMENTS$2.map((dep) => /* @__PURE__ */ jsxs(
            Link,
            {
              to: dep.href,
              className: "flex items-center gap-2 bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded-xl px-3 py-2.5 text-blue-700 font-semibold text-xs transition-colors",
              children: [
                /* @__PURE__ */ jsx(MapPin, { size: 12 }),
                " Taxi – ",
                dep.label
              ]
            },
            dep.href
          )) })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("section", { className: "mb-8", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-xl font-bold text-gray-800 mb-4 text-center", children: "Questions fréquentes" }),
        /* @__PURE__ */ jsx("div", { className: "space-y-2", children: FAQ_ITEMS$3.map((item, i) => /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden", children: [
          /* @__PURE__ */ jsxs(
            "button",
            {
              onClick: () => setOpenFaq(openFaq === i ? null : i),
              className: "w-full flex items-center justify-between gap-3 px-4 py-3.5 text-left hover:bg-gray-50 transition-colors",
              "aria-expanded": openFaq === i,
              children: [
                /* @__PURE__ */ jsx("span", { className: "font-semibold text-gray-800 text-sm", children: item.question }),
                openFaq === i ? /* @__PURE__ */ jsx(ChevronUp, { size: 15, className: "text-blue-600 flex-shrink-0" }) : /* @__PURE__ */ jsx(ChevronDown, { size: 15, className: "text-gray-400 flex-shrink-0" })
              ]
            }
          ),
          openFaq === i && /* @__PURE__ */ jsx("div", { className: "px-4 pb-4 text-gray-600 text-xs leading-relaxed border-t border-gray-100", children: /* @__PURE__ */ jsx("p", { className: "mt-3", children: item.answer }) })
        ] }, i)) })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "bg-blue-700 text-white rounded-2xl p-5 sm:p-8 text-center", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-lg sm:text-xl font-bold mb-1.5", children: "Prêt à réserver ?" }),
        /* @__PURE__ */ jsx("p", { className: "text-blue-100 mb-4 text-xs sm:text-sm", children: "Service 24h/24 – 7j/7 en Île-de-France." }),
        /* @__PURE__ */ jsxs("div", { className: "flex flex-col sm:flex-row gap-2 justify-center", children: [
          /* @__PURE__ */ jsxs(
            "a",
            {
              href: "tel:+33650366491",
              className: "inline-flex items-center justify-center gap-2 bg-white text-blue-700 font-bold px-5 py-3 rounded-xl hover:bg-blue-50 transition-colors text-sm",
              children: [
                /* @__PURE__ */ jsx(Phone, { size: 15 }),
                " 06 50 36 64 91"
              ]
            }
          ),
          /* @__PURE__ */ jsx(
            "button",
            {
              type: "button",
              onClick: () => {
                var _a2;
                return (_a2 = document.getElementById("page-title")) == null ? void 0 : _a2.scrollIntoView({ behavior: "smooth" });
              },
              className: "inline-flex items-center justify-center gap-2 border-2 border-white text-white font-bold px-5 py-3 rounded-xl hover:bg-blue-600 transition-colors text-sm",
              children: "Remplir le formulaire"
            }
          )
        ] })
      ] })
    ] }) }) })
  ] });
}
const DEPARTMENTS$1 = [
  {
    code: "75",
    name: "Paris",
    slug: "taxi-conventionne-paris-75",
    description: "Tous les arrondissements de Paris intramuros, du 1er au 20e.",
    color: "bg-blue-100 text-blue-600 border-blue-200",
    circleColor: "border-blue-300",
    dotColor: "bg-blue-400",
    btnColor: "bg-blue-600 hover:bg-blue-700",
    cities: ["Paris"],
    villesCount: "20+",
    hopitauxCount: "35+"
  },
  {
    code: "91",
    name: "Essonne",
    slug: "taxi-conventionne-essonne-91",
    description: "Évry-Courcouronnes, Corbeil-Essonnes, Massy, Palaiseau et 50+ villes.",
    color: "bg-green-100 text-green-600 border-green-200",
    circleColor: "border-green-300",
    dotColor: "bg-green-400",
    btnColor: "bg-green-600 hover:bg-green-700",
    cities: ["Evry", "Palaiseau", "Etampes"],
    villesCount: "40+",
    hopitauxCount: "25+"
  },
  {
    code: "92",
    name: "Hauts-de-Seine",
    slug: "taxi-conventionne-hauts-de-seine-92",
    description: "Nanterre, Boulogne-Billancourt, Courbevoie, Neuilly-sur-Seine et plus.",
    color: "bg-amber-100 text-amber-600 border-amber-200",
    circleColor: "border-amber-300",
    dotColor: "bg-amber-400",
    btnColor: "bg-amber-600 hover:bg-amber-700",
    cities: ["Nanterre", "Boulogne-B.", "Antony"],
    villesCount: "35+",
    hopitauxCount: "20+"
  },
  {
    code: "93",
    name: "Seine-Saint-Denis",
    slug: "taxi-conventionne-seine-saint-denis-93",
    description: "Bobigny, Saint-Denis, Montreuil, Aulnay-sous-Bois et plus.",
    color: "bg-rose-100 text-rose-600 border-rose-200",
    circleColor: "border-rose-300",
    dotColor: "bg-rose-400",
    btnColor: "bg-rose-600 hover:bg-rose-700",
    cities: ["Saint-Denis", "Bobigny", "Montreuil"],
    villesCount: "30+",
    hopitauxCount: "15+"
  },
  {
    code: "94",
    name: "Val-de-Marne",
    slug: "taxi-conventionne-val-de-marne-94",
    description: "Créteil, Vitry-sur-Seine, Champigny-sur-Marne et 40+ villes.",
    color: "bg-rose-100 text-rose-600 border-rose-200",
    circleColor: "border-rose-300",
    dotColor: "bg-rose-400",
    btnColor: "bg-rose-600 hover:bg-rose-700",
    cities: ["Creteil", "Ivry-s-Seine", "Vitry-s-Seine"],
    villesCount: "30+",
    hopitauxCount: "20+"
  }
];
const FAQ_ITEMS$2 = [
  {
    question: "Quelle est la différence entre un taxi conventionné et un VSL ?",
    answer: "Un taxi conventionné est un véhicule de taxi agréé par la CPAM pour transporter des patients assis. Le VSL (Véhicule Sanitaire Léger) est un véhicule sanitaire dédié, conduit par un auxiliaire ambulancier. Les deux sont remboursables sur prescription médicale. Le taxi conventionné est privilégié pour les patients pouvant se déplacer normalement, tandis que le VSL convient aux patients nécessitant une aide légère à la mobilité."
  },
  {
    question: "Quelles conditions faut-il remplir pour bénéficier du remboursement CPAM ?",
    answer: "Pour obtenir la prise en charge par la CPAM, trois conditions sont nécessaires : (1) une prescription médicale de transport établie par votre médecin sur formulaire Cerfa S3138 ; (2) un trajet vers un établissement de soin conventionné ou agréé ; (3) une incapacité à utiliser les transports en commun justifiée par votre état de santé. Le remboursement atteint 100 % pour les patients en ALD, CMU-C ou maternité."
  },
  {
    question: "Quelles villes d'Île-de-France sont couvertes par votre service ?",
    answer: "Nous desservons plus de 200 communes réparties sur 5 départements : Paris (75) avec tous ses arrondissements, l'Essonne (91), les Hauts-de-Seine (92), la Seine-Saint-Denis (93) et le Val-de-Marne (94). Les transferts inter-hospitaliers entre ces départements sont également assurés 24h/24."
  },
  {
    question: "Peut-on réserver un taxi conventionné pour une séance de dialyse ou chimiothérapie régulière ?",
    answer: "Oui, nous prenons en charge les transports répétitifs pour dialyse, chimiothérapie et radiothérapie. Il suffit d'une prescription médicale valable pour plusieurs séances (ordonnance de série). Nous établissons un planning récurrent afin que vous soyez pris en charge à chaque séance, sans avoir à réserver à chaque fois."
  },
  {
    question: "Quel délai pour confirmer une réservation de taxi VSL ?",
    answer: "Après soumission de votre demande en ligne, notre équipe vous contacte par téléphone dans les plus brefs délais pour confirmer la disponibilité. Nous recommandons de réserver au minimum 24 heures à l'avance. Pour les transports urgents ou non programmés, appelez directement le 06 50 36 64 91 disponible 24h/24, 7j/7."
  }
];
const jsonLDWebPage$1 = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Zones desservies – Taxi VSL Conventionné CPAM Île-de-France",
  description: "Toutes les zones desservies par notre service de taxi conventionné et VSL en Île-de-France : Paris (75), Essonne (91), Hauts-de-Seine (92), Seine-Saint-Denis (93), Val-de-Marne (94). Plus de 200 communes.",
  url: "https://www.taxisparis-conventionnes.fr/zones-desservies",
  breadcrumb: {
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Accueil", item: "https://www.taxisparis-conventionnes.fr/" },
      { "@type": "ListItem", position: 2, name: "Zones desservies", item: "https://www.taxisparis-conventionnes.fr/zones-desservies" }
    ]
  }
};
const jsonLDFAQ$1 = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQ_ITEMS$2.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: { "@type": "Answer", text: item.answer }
  }))
};
const jsonLDMedical$1 = {
  "@context": "https://schema.org",
  "@type": "MedicalBusiness",
  name: "Taxis Paris Conventionnés",
  url: "https://www.taxisparis-conventionnes.fr/",
  telephone: "+33650366491",
  areaServed: ["Paris", "Essonne", "Hauts-de-Seine", "Seine-Saint-Denis", "Val-de-Marne"],
  openingHours: "Mo-Su 00:00-23:59",
  description: "Service de taxi conventionné CPAM et VSL en Île-de-France pour tous vos transports médicaux : consultations, dialyse, chimiothérapie, radiothérapie, hospitalisations."
};
function Zones({ onNavigate }) {
  const [openFaq, setOpenFaq] = useState(null);
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(
      SEOHead,
      {
        title: "Zones desservies Taxi VSL Conventionné CPAM | Île-de-France 200+ villes",
        description: "Taxi conventionné et VSL remboursé CPAM en Île-de-France : Paris (75), Essonne (91), Hauts-de-Seine (92), Seine-Saint-Denis (93), Val-de-Marne (94). Plus de 200 communes. Disponible 24h/24.",
        keywords: [
          "zones taxi conventionné",
          "villes desservies VSL",
          "taxi conventionné Paris 75",
          "VSL Essonne 91",
          "transport médical Hauts-de-Seine 92",
          "taxi conventionné Seine-Saint-Denis 93",
          "VSL Val-de-Marne 94",
          "taxi conventionné CPAM Île-de-France",
          "transport médical remboursé"
        ],
        canonical: "https://www.taxisparis-conventionnes.fr/zones-desservies",
        jsonLD: [jsonLDWebPage$1, jsonLDFAQ$1, jsonLDMedical$1]
      }
    ),
    /* @__PURE__ */ jsx("section", { className: "bg-gradient-to-br from-blue-600 to-blue-700 text-white py-12 sm:py-16", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-4 text-center", children: [
      /* @__PURE__ */ jsxs("div", { className: "inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 text-sm font-medium mb-4", children: [
        /* @__PURE__ */ jsx(MapPin, { size: 14, "aria-hidden": "true" }),
        "200+ communes desservies"
      ] }),
      /* @__PURE__ */ jsxs("h1", { className: "text-3xl sm:text-4xl md:text-5xl font-bold mb-4 leading-tight", children: [
        "Zones desservies par notre service",
        /* @__PURE__ */ jsx("br", { className: "hidden sm:block" }),
        " de taxi VSL conventionné"
      ] }),
      /* @__PURE__ */ jsxs("p", { className: "text-lg sm:text-xl text-white/90 max-w-2xl mx-auto mb-8", children: [
        "Île-de-France — Paris (75), Essonne (91), Hauts-de-Seine (92),",
        /* @__PURE__ */ jsx("br", { className: "hidden sm:block" }),
        " Seine-Saint-Denis (93) et Val-de-Marne (94)"
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col sm:flex-row justify-center gap-3", children: [
        /* @__PURE__ */ jsxs(
          Link,
          {
            to: "/reservation-taxi-vsl",
            className: "inline-flex items-center justify-center gap-2 bg-white text-blue-600 font-bold px-6 py-3 rounded-xl hover:bg-blue-50 transition shadow-lg",
            children: [
              "Réserver maintenant",
              /* @__PURE__ */ jsx(ArrowRight, { size: 18, "aria-hidden": "true" })
            ]
          }
        ),
        /* @__PURE__ */ jsxs(
          "a",
          {
            href: "tel:+33650366491",
            className: "inline-flex items-center justify-center gap-2 bg-white/10 border-2 border-white text-white font-bold px-6 py-3 rounded-xl hover:bg-white hover:text-blue-600 transition",
            children: [
              /* @__PURE__ */ jsx(Phone, { size: 16, "aria-hidden": "true" }),
              "06 50 36 64 91"
            ]
          }
        )
      ] })
    ] }) }),
    /* @__PURE__ */ jsx("section", { className: "py-12 bg-gray-50", "aria-label": "Départements couverts", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-4", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-2xl sm:text-3xl font-bold text-gray-800 text-center mb-8", children: "Nos 5 départements d'intervention" }),
      /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5 mb-10", children: DEPARTMENTS$1.map((dept) => /* @__PURE__ */ jsxs(
        "div",
        {
          className: "bg-white rounded-2xl border border-gray-200 p-5 hover:shadow-lg transition-shadow flex flex-col",
          children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 mb-4", children: [
              /* @__PURE__ */ jsx("span", { className: `w-11 h-11 rounded-full flex items-center justify-center text-sm font-bold border-2 ${dept.color}`, children: dept.code }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("h3", { className: "text-base font-bold text-gray-900 leading-tight", children: dept.name }),
                /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-400", children: "Departement" })
              ] })
            ] }),
            /* @__PURE__ */ jsx("div", { className: "flex justify-center mb-4", children: /* @__PURE__ */ jsxs("div", { className: `relative w-36 h-36 rounded-full border-2 ${dept.circleColor} flex items-center justify-center`, children: [
              /* @__PURE__ */ jsx("div", { className: `absolute w-28 h-28 rounded-full border ${dept.circleColor} opacity-50` }),
              dept.cities.map((city, i) => {
                const positions = dept.cities.length === 1 ? [{ top: "50%", left: "50%" }] : dept.cities.length === 3 ? [{ top: "25%", left: "55%" }, { top: "55%", left: "25%" }, { top: "70%", left: "65%" }] : [{ top: "35%", left: "30%" }, { top: "55%", left: "60%" }];
                const pos = positions[i] || { top: "50%", left: "50%" };
                return /* @__PURE__ */ jsxs("div", { className: "absolute flex items-center gap-1", style: { top: pos.top, left: pos.left, transform: "translate(-50%, -50%)" }, children: [
                  /* @__PURE__ */ jsx("span", { className: `w-2 h-2 rounded-full ${dept.dotColor}` }),
                  /* @__PURE__ */ jsx("span", { className: "text-[9px] text-gray-500 font-medium whitespace-nowrap", children: city })
                ] }, city);
              })
            ] }) }),
            /* @__PURE__ */ jsxs("div", { className: "space-y-2 mb-5 flex-1", children: [
              /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
                /* @__PURE__ */ jsx(Building2, { size: 14, className: "text-gray-400" }),
                /* @__PURE__ */ jsxs("span", { className: "text-sm", children: [
                  /* @__PURE__ */ jsx("strong", { className: "text-green-600", children: dept.villesCount }),
                  " ",
                  /* @__PURE__ */ jsx("span", { className: "text-gray-500", children: "Villes desservies" })
                ] })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
                /* @__PURE__ */ jsx(CircleDot, { size: 14, className: "text-gray-400" }),
                /* @__PURE__ */ jsxs("span", { className: "text-sm", children: [
                  /* @__PURE__ */ jsx("strong", { className: "text-green-600", children: dept.hopitauxCount }),
                  " ",
                  /* @__PURE__ */ jsx("span", { className: "text-gray-500", children: "Hopitaux partenaires" })
                ] })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
                /* @__PURE__ */ jsx(BadgeCheck, { size: 14, className: "text-green-500" }),
                /* @__PURE__ */ jsx("span", { className: "text-sm text-green-600 font-medium", children: "Conventionne CPAM" })
              ] })
            ] }),
            /* @__PURE__ */ jsxs(
              Link,
              {
                to: `/${dept.slug}`,
                className: `w-full flex items-center justify-center gap-2 text-white font-semibold text-sm px-4 py-3 rounded-xl transition ${dept.btnColor}`,
                "aria-label": `Voir les villes desservies en ${dept.name} (${dept.code})`,
                children: [
                  "Voir les villes",
                  /* @__PURE__ */ jsx(ArrowRight, { size: 16, "aria-hidden": "true" })
                ]
              }
            )
          ]
        },
        dept.code
      )) })
    ] }) }),
    /* @__PURE__ */ jsx("section", { className: "py-12 bg-white", "aria-label": "Informations sur le taxi VSL conventionné", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-4 max-w-4xl", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-2xl sm:text-3xl font-bold text-gray-800 mb-8 text-center", children: "Tout savoir sur le taxi conventionné VSL en Île-de-France" }),
      /* @__PURE__ */ jsxs("div", { className: "mb-8", children: [
        /* @__PURE__ */ jsxs("h3", { className: "text-xl font-bold text-blue-700 mb-3 flex items-center gap-2", children: [
          /* @__PURE__ */ jsx(CheckCircle, { size: 20, className: "text-blue-500 flex-shrink-0", "aria-hidden": "true" }),
          "Qu'est-ce qu'un taxi conventionné VSL ?"
        ] }),
        /* @__PURE__ */ jsxs("p", { className: "text-gray-700 leading-relaxed mb-3", children: [
          "Un ",
          /* @__PURE__ */ jsx("strong", { children: "taxi conventionné" }),
          " est un véhicule de transport individuel agréé par la Caisse Primaire d'Assurance Maladie (CPAM) pour assurer des transports médicaux non urgents. Il se distingue de l'ambulance — réservée aux situations d'urgence ou de grande dépendance — et du VSL (Véhicule Sanitaire Léger), destiné aux patients nécessitant une aide légère à la mobilité. Le taxi conventionné transporte des patients dits « assis », c'est-à-dire capables de monter et descendre du véhicule sans assistance particulière."
        ] }),
        /* @__PURE__ */ jsx("p", { className: "text-gray-700 leading-relaxed", children: "Notre flotte de taxis conventionnés couvre l'intégralité de l'Île-de-France, 24 heures sur 24 et 7 jours sur 7. Chaque chauffeur est titulaire d'une convention avec la CPAM, ce qui garantit que vos frais de transport sont directement pris en charge par l'Assurance Maladie, sans avance de frais dans la majorité des cas." })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "mb-8", children: [
        /* @__PURE__ */ jsxs("h3", { className: "text-xl font-bold text-blue-700 mb-3 flex items-center gap-2", children: [
          /* @__PURE__ */ jsx(CheckCircle, { size: 20, className: "text-blue-500 flex-shrink-0", "aria-hidden": "true" }),
          "Conditions de prise en charge par la CPAM"
        ] }),
        /* @__PURE__ */ jsxs("p", { className: "text-gray-700 leading-relaxed mb-3", children: [
          "Pour bénéficier du remboursement de votre transport par la Sécurité sociale, plusieurs conditions doivent être réunies. En premier lieu, vous devez disposer d'une ",
          /* @__PURE__ */ jsx("strong", { children: "prescription médicale de transport" }),
          " (formulaire Cerfa S3138), établie par votre médecin traitant ou spécialiste. Ce document précise la destination, la fréquence des trajets et le mode de transport adapté à votre état de santé."
        ] }),
        /* @__PURE__ */ jsxs("p", { className: "text-gray-700 leading-relaxed mb-3", children: [
          "Le taux de remboursement varie selon votre situation : il atteint ",
          /* @__PURE__ */ jsx("strong", { children: "100 % pour les patients en Affection de Longue Durée (ALD)" }),
          ", les bénéficiaires de la Complémentaire Santé Solidaire (CSS), les femmes enceintes à partir du 6e mois et les victimes d'accident du travail. Pour les autres situations, la prise en charge est de 65 % du tarif conventionné, le solde pouvant être couvert par votre mutuelle."
        ] }),
        /* @__PURE__ */ jsx("p", { className: "text-gray-700 leading-relaxed", children: "Il est également possible de bénéficier d'une prise en charge pour des transports en série (dialyse, chimiothérapie, radiothérapie) grâce à une ordonnance de série valable plusieurs mois, évitant ainsi de renouveler la prescription à chaque séance." })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "mb-8", children: [
        /* @__PURE__ */ jsxs("h3", { className: "text-xl font-bold text-blue-700 mb-3 flex items-center gap-2", children: [
          /* @__PURE__ */ jsx(CheckCircle, { size: 20, className: "text-blue-500 flex-shrink-0", "aria-hidden": "true" }),
          "Types de transports médicaux assurés"
        ] }),
        /* @__PURE__ */ jsxs("p", { className: "text-gray-700 leading-relaxed mb-3", children: [
          "Notre service de taxi conventionné prend en charge l'ensemble des déplacements médicaux non urgents : ",
          /* @__PURE__ */ jsx("strong", { children: "consultations chez le médecin généraliste ou spécialiste" }),
          ", bilans biologiques et radiologiques, hospitalisations programmées et sorties d'hôpital, séances de rééducation fonctionnelle, consultations en cabinet de kinésithérapie ou d'orthophonie."
        ] }),
        /* @__PURE__ */ jsxs("p", { className: "text-gray-700 leading-relaxed mb-3", children: [
          "Nous assurons également les transports répétitifs pour les patients dialysés (2 à 3 fois par semaine), les patients en cours de ",
          /* @__PURE__ */ jsx("strong", { children: "chimiothérapie ou de radiothérapie" }),
          ", ainsi que les transferts inter-hospitaliers entre établissements de santé d'Île-de-France. Les transports vers les aéroports de Roissy-CDG et Orly pour raison médicale sont également couverts."
        ] }),
        /* @__PURE__ */ jsx("p", { className: "text-gray-700 leading-relaxed", children: "Nos chauffeurs sont formés à l'accueil de patients en situation de fragilité, de handicap ou de mobilité réduite. Le confort, la discrétion et la ponctualité sont au cœur de notre prestation." })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "mb-8", children: [
        /* @__PURE__ */ jsxs("h3", { className: "text-xl font-bold text-blue-700 mb-3 flex items-center gap-2", children: [
          /* @__PURE__ */ jsx(CheckCircle, { size: 20, className: "text-blue-500 flex-shrink-0", "aria-hidden": "true" }),
          "Pourquoi choisir notre service de taxi conventionné ?"
        ] }),
        /* @__PURE__ */ jsx("p", { className: "text-gray-700 leading-relaxed mb-4", children: "Face à la multitude d'opérateurs, plusieurs raisons font de notre service un choix de confiance pour les patients et professionnels de santé d'Île-de-France. Nous sommes conventionnés avec la CPAM, ce qui signifie que la facturation est directe : vous n'avez pas à avancer les frais. Nos chauffeurs connaissent parfaitement les établissements de santé de la région et garantissent des créneaux horaires respectés, essentiels pour les patients sous dialyse ou en chimiothérapie." }),
        /* @__PURE__ */ jsx("p", { className: "text-gray-700 leading-relaxed mb-5", children: "Notre disponibilité 24h/24, 7j/7, y compris les jours fériés, vous assure de ne jamais manquer un rendez-vous médical important. La réservation se fait en ligne ou par téléphone, et une confirmation vous est envoyée rapidement." }),
        /* @__PURE__ */ jsx("div", { className: "grid sm:grid-cols-2 gap-3", children: DEPARTMENTS$1.map((dept) => /* @__PURE__ */ jsxs(
          Link,
          {
            to: `/${dept.slug}`,
            className: "flex items-center gap-3 bg-blue-50 border border-blue-100 rounded-xl px-4 py-3 hover:bg-blue-100 hover:border-blue-300 transition group",
            "aria-label": `Taxi conventionné ${dept.name} (${dept.code})`,
            children: [
              /* @__PURE__ */ jsx("span", { className: "flex-shrink-0 w-10 h-10 bg-blue-600 text-white rounded-lg flex items-center justify-center font-bold text-sm", children: dept.code }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsxs("div", { className: "font-semibold text-gray-800 text-sm group-hover:text-blue-700 transition", children: [
                  "Taxi conventionné ",
                  dept.name
                ] }),
                /* @__PURE__ */ jsx("div", { className: "text-xs text-gray-500", children: dept.description.split(",")[0] })
              ] }),
              /* @__PURE__ */ jsx(ArrowRight, { size: 14, className: "ml-auto text-blue-400 group-hover:translate-x-1 transition", "aria-hidden": "true" })
            ]
          },
          dept.code
        )) })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "mb-4", children: [
        /* @__PURE__ */ jsxs("h3", { className: "text-xl font-bold text-blue-700 mb-3 flex items-center gap-2", children: [
          /* @__PURE__ */ jsx(CheckCircle, { size: 20, className: "text-blue-500 flex-shrink-0", "aria-hidden": "true" }),
          "Zone d'intervention et couverture géographique"
        ] }),
        /* @__PURE__ */ jsxs("p", { className: "text-gray-700 leading-relaxed mb-3", children: [
          "Notre zone d'intervention principale couvre les cinq départements de la petite couronne et de Paris. En pratique, cela représente plus de ",
          /* @__PURE__ */ jsx("strong", { children: "200 communes" }),
          ", des grandes agglomérations comme Boulogne-Billancourt, Nanterre ou Créteil jusqu'aux villes moyennes comme Palaiseau, Massy, Savigny-sur-Orge ou Champigny-sur-Marne. Les transferts entre hôpitaux ou cliniques situés dans des départements différents sont une spécialité de notre service."
        ] }),
        /* @__PURE__ */ jsx("p", { className: "text-gray-700 leading-relaxed mb-3", children: "Pour les trajets hors Île-de-France (vers un centre hospitalier universitaire en province par exemple), nous étudions chaque demande au cas par cas. Certains transports longue distance peuvent être pris en charge par la CPAM sous conditions spécifiques, notamment pour les patients ne pouvant être soignés localement." }),
        /* @__PURE__ */ jsxs("p", { className: "text-gray-700 leading-relaxed", children: [
          "Vous souhaitez vérifier que votre commune est bien desservie ? Consultez les pages de chaque département ou contactez-nous directement au ",
          /* @__PURE__ */ jsx("a", { href: "tel:+33650366491", className: "text-blue-600 font-semibold hover:underline", children: "06 50 36 64 91" }),
          ". Notre équipe vous renseignera sur les modalités de prise en charge et les disponibilités dans votre secteur."
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ jsx("section", { className: "py-12 bg-gray-50", "aria-label": "Questions fréquentes", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-4 max-w-3xl", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-2xl sm:text-3xl font-bold text-gray-800 text-center mb-8", children: "Questions fréquentes" }),
      /* @__PURE__ */ jsx("div", { className: "space-y-3", children: FAQ_ITEMS$2.map((item, index) => {
        const isOpen = openFaq === index;
        return /* @__PURE__ */ jsxs(
          "div",
          {
            className: "bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden",
            children: [
              /* @__PURE__ */ jsxs(
                "button",
                {
                  className: "w-full flex items-center justify-between gap-4 px-5 py-4 text-left hover:bg-gray-50 transition focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-inset",
                  "aria-expanded": isOpen,
                  "aria-controls": `faq-answer-${index}`,
                  id: `faq-question-${index}`,
                  onClick: () => setOpenFaq(isOpen ? null : index),
                  type: "button",
                  children: [
                    /* @__PURE__ */ jsx("span", { className: "font-semibold text-gray-800 text-sm sm:text-base pr-2", children: item.question }),
                    /* @__PURE__ */ jsx("span", { className: "flex-shrink-0 text-blue-600", "aria-hidden": "true", children: isOpen ? /* @__PURE__ */ jsx(ChevronUp, { size: 20 }) : /* @__PURE__ */ jsx(ChevronDown, { size: 20 }) })
                  ]
                }
              ),
              /* @__PURE__ */ jsx(
                "div",
                {
                  id: `faq-answer-${index}`,
                  role: "region",
                  "aria-labelledby": `faq-question-${index}`,
                  hidden: !isOpen,
                  children: /* @__PURE__ */ jsx("p", { className: "px-5 pb-5 text-gray-700 leading-relaxed text-sm sm:text-base border-t border-gray-100 pt-3", children: item.answer })
                }
              )
            ]
          },
          index
        );
      }) })
    ] }) }),
    /* @__PURE__ */ jsx("section", { className: "py-12 bg-white", "aria-label": "Réserver un transport médical", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-4 max-w-2xl text-center", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-2xl font-bold text-gray-800 mb-3", children: "Votre destination n'est pas listée ?" }),
      /* @__PURE__ */ jsx("p", { className: "text-gray-600 mb-6", children: "Contactez-nous pour connaître nos disponibilités. Nous intervenons dans toute l'Île-de-France et étudions chaque demande." }),
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col sm:flex-row justify-center gap-3", children: [
        /* @__PURE__ */ jsxs(
          Link,
          {
            to: "/reservation-taxi-vsl",
            className: "inline-flex items-center justify-center gap-2 bg-blue-600 text-white font-bold px-8 py-3.5 rounded-xl hover:bg-blue-700 transition shadow-md",
            children: [
              "Faire une réservation",
              /* @__PURE__ */ jsx(ArrowRight, { size: 18, "aria-hidden": "true" })
            ]
          }
        ),
        /* @__PURE__ */ jsxs(
          "a",
          {
            href: "tel:+33650366491",
            className: "inline-flex items-center justify-center gap-2 border-2 border-blue-600 text-blue-600 font-bold px-8 py-3.5 rounded-xl hover:bg-blue-600 hover:text-white transition",
            children: [
              /* @__PURE__ */ jsx(Phone, { size: 16, "aria-hidden": "true" }),
              "Appeler maintenant"
            ]
          }
        )
      ] })
    ] }) })
  ] });
}
const zoneData = {
  "75": {
    name: "Paris",
    description: "Service de taxi dans tous les arrondissements de Paris, 24h/24 et 7j/7",
    cities: [
      "1er arrondissement - Louvre",
      "2e arrondissement - Bourse",
      "3e arrondissement - Temple",
      "4e arrondissement - Hôtel-de-Ville",
      "5e arrondissement - Panthéon",
      "6e arrondissement - Luxembourg",
      "7e arrondissement - Palais-Bourbon",
      "8e arrondissement - Élysée",
      "9e arrondissement - Opéra",
      "10e arrondissement - Entrepôt",
      "11e arrondissement - Popincourt",
      "12e arrondissement - Reuilly",
      "13e arrondissement - Gobelins",
      "14e arrondissement - Observatoire",
      "15e arrondissement - Vaugirard",
      "16e arrondissement - Passy",
      "17e arrondissement - Batignolles-Monceau",
      "18e arrondissement - Butte-Montmartre",
      "19e arrondissement - Buttes-Chaumont",
      "20e arrondissement - Ménilmontant"
    ],
    features: [
      "Service 24h/24, 7j/7",
      "Tous les hôpitaux parisiens",
      "Gares et monuments",
      "Quartiers d'affaires"
    ]
  },
  "91": {
    name: "Essonne",
    description: "Transport taxi dans tout le département de l'Essonne",
    cities: [
      "Évry-Courcouronnes",
      "Corbeil-Essonnes",
      "Massy",
      "Savigny-sur-Orge",
      "Sainte-Geneviève-des-Bois",
      "Palaiseau",
      "Athis-Mons",
      "Viry-Châtillon",
      "Yerres",
      "Draveil",
      "Ris-Orangis",
      "Grigny",
      "Brunoy",
      "Les Ulis",
      "Montgeron"
    ],
    features: [
      "Connexion avec Paris",
      "Aéroport d'Orly",
      "Zones d'activités",
      "Hôpitaux du département"
    ]
  },
  "92": {
    name: "Hauts-de-Seine",
    description: "Service taxi professionnel dans les Hauts-de-Seine",
    cities: [
      "Nanterre",
      "Boulogne-Billancourt",
      "Courbevoie",
      "Colombes",
      "Asnières-sur-Seine",
      "Rueil-Malmaison",
      "Levallois-Perret",
      "Issy-les-Moulineaux",
      "Antony",
      "Neuilly-sur-Seine",
      "Clamart",
      "Clichy",
      "Suresnes",
      "Puteaux",
      "Montrouge"
    ],
    features: [
      "La Défense",
      "Zones d'affaires",
      "Connexions Paris-Ouest",
      "Hôpitaux et cliniques"
    ]
  },
  "93": {
    name: "Seine-Saint-Denis",
    description: "Taxi disponible dans toute la Seine-Saint-Denis",
    cities: [
      "Saint-Denis",
      "Montreuil",
      "Aubervilliers",
      "Aulnay-sous-Bois",
      "Drancy",
      "Noisy-le-Grand",
      "Pantin",
      "Le Blanc-Mesnil",
      "Sevran",
      "Épinay-sur-Seine",
      "Bobigny",
      "Bondy",
      "Livry-Gargan",
      "Rosny-sous-Bois",
      "Gagny"
    ],
    features: [
      "Aéroport CDG proche",
      "Stade de France",
      "Connexions Paris-Nord",
      "Centres hospitaliers"
    ]
  },
  "94": {
    name: "Val-de-Marne",
    description: "Service de taxi dans le Val-de-Marne",
    cities: [
      "Créteil",
      "Vitry-sur-Seine",
      "Saint-Maur-des-Fossés",
      "Champigny-sur-Marne",
      "Ivry-sur-Seine",
      "Maisons-Alfort",
      "Fontenay-sous-Bois",
      "Villejuif",
      "Vincennes",
      "Alfortville",
      "Le Perreux-sur-Marne",
      "Nogent-sur-Marne",
      "Choisy-le-Roi",
      "Thiais",
      "Cachan"
    ],
    features: [
      "Connexions Paris-Est",
      "Aéroport d'Orly",
      "CHU et hôpitaux",
      "Zones commerciales"
    ]
  }
};
function ZoneDetail({ zone, onNavigate }) {
  const data = zoneData[zone];
  if (!data) {
    return /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsx(
        SEOHead,
        {
          title: "Zone non trouvée - Taxi VSL Conventionné",
          description: "Cette zone n'existe pas dans notre système.",
          robots: "noindex, nofollow"
        }
      ),
      /* @__PURE__ */ jsx("div", { className: "py-12", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-4 text-center", children: [
        /* @__PURE__ */ jsx("h1", { className: "text-3xl font-bold text-gray-800 mb-4", children: "Zone non trouvée" }),
        /* @__PURE__ */ jsx(
          "button",
          {
            onClick: () => onNavigate("zones"),
            className: "text-blue-600 hover:underline",
            children: "Retour aux zones"
          }
        )
      ] }) })
    ] });
  }
  const jsonLD = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": `Taxi VSL ${data.name}`,
    "description": data.description,
    "url": `https://www.taxisparis-conventionnes.fr/zone/${zone}`
  };
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(
      SEOHead,
      {
        title: `Taxi VSL Conventionné ${data.name} - Transport Médical`,
        description: data.description,
        keywords: [`taxi ${data.name}`, `VSL ${data.name}`, `transport médical ${data.name}`, `taxi conventionné ${zone}`],
        canonical: `https://www.taxisparis-conventionnes.fr/zone/${zone}`,
        jsonLD
      }
    ),
    /* @__PURE__ */ jsx("div", { className: "py-12", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-4", children: [
      /* @__PURE__ */ jsx(
        "button",
        {
          onClick: () => onNavigate("zones"),
          className: "text-blue-600 hover:underline mb-6 flex items-center gap-2",
          children: "← Retour aux zones"
        }
      ),
      /* @__PURE__ */ jsxs("div", { className: "max-w-5xl mx-auto", children: [
        /* @__PURE__ */ jsxs("div", { className: "bg-gradient-to-br from-blue-600 to-blue-800 text-white rounded-lg p-8 mb-8", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4 mb-4", children: [
            /* @__PURE__ */ jsx(MapPin, { size: 48 }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("div", { className: "text-5xl font-bold", children: zone }),
              /* @__PURE__ */ jsx("h1", { className: "text-3xl font-bold", children: data.name })
            ] })
          ] }),
          /* @__PURE__ */ jsx("p", { className: "text-xl text-blue-100", children: data.description })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "grid md:grid-cols-2 gap-8 mb-8", children: [
          /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-lg shadow-lg p-6", children: [
            /* @__PURE__ */ jsx("h2", { className: "text-2xl font-bold text-gray-800 mb-4", children: "Nos atouts" }),
            /* @__PURE__ */ jsx("ul", { className: "space-y-3", children: data.features.map((feature, index) => /* @__PURE__ */ jsxs("li", { className: "flex items-start gap-3", children: [
              /* @__PURE__ */ jsx(CheckCircle, { className: "text-blue-600 flex-shrink-0 mt-1", size: 20 }),
              /* @__PURE__ */ jsx("span", { className: "text-gray-700", children: feature })
            ] }, index)) })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-lg shadow-lg p-6", children: [
            /* @__PURE__ */ jsx("h2", { className: "text-2xl font-bold text-gray-800 mb-4", children: "Contact" }),
            /* @__PURE__ */ jsx("p", { className: "text-gray-600 mb-4", children: "Réservez votre course dès maintenant" }),
            /* @__PURE__ */ jsxs("div", { className: "space-y-3", children: [
              /* @__PURE__ */ jsxs(
                "a",
                {
                  href: "tel:+33123456789",
                  className: "flex items-center gap-3 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition",
                  children: [
                    /* @__PURE__ */ jsx(Phone, { size: 20 }),
                    /* @__PURE__ */ jsx("span", { className: "font-semibold", children: "06 50 36 64 91" })
                  ]
                }
              ),
              /* @__PURE__ */ jsx(
                "button",
                {
                  onClick: () => onNavigate("reservation"),
                  className: "w-full border-2 border-blue-600 text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-600 hover:text-white transition",
                  children: "Réserver en ligne"
                }
              )
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-lg shadow-lg p-6", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-2xl font-bold text-gray-800 mb-4", children: "Principales villes desservies" }),
          /* @__PURE__ */ jsx("div", { className: "grid md:grid-cols-3 gap-3", children: data.cities.map((city, index) => /* @__PURE__ */ jsxs(
            "div",
            {
              className: "flex items-center gap-2 text-gray-700 bg-gray-50 px-4 py-2 rounded",
              children: [
                /* @__PURE__ */ jsx(MapPin, { size: 16, className: "text-blue-600" }),
                /* @__PURE__ */ jsx("span", { children: city })
              ]
            },
            index
          )) })
        ] })
      ] })
    ] }) })
  ] });
}
function Stations({ onNavigate }) {
  const airports = [
    {
      name: "Aéroport Roissy Charles de Gaulle",
      code: "CDG",
      description: "Terminal 1, 2 et 3",
      forfait: "À partir de 55€",
      duration: "30-45 min depuis Paris"
    },
    {
      name: "Aéroport d'Orly",
      code: "ORY",
      description: "Orly 1, 2, 3 et 4",
      forfait: "À partir de 40€",
      duration: "25-35 min depuis Paris"
    },
    {
      name: "Aéroport de Beauvais",
      code: "BVA",
      description: "Beauvais-Tillé",
      forfait: "À partir de 120€",
      duration: "1h15-1h30 depuis Paris"
    }
  ];
  const stations = [
    { name: "Gare du Nord", lines: "TGV, Eurostar, Thalys" },
    { name: "Gare de l'Est", lines: "TGV Est Européen" },
    { name: "Gare de Lyon", lines: "TGV Sud-Est, Méditerranée" },
    { name: "Gare Montparnasse", lines: "TGV Atlantique, Bretagne" },
    { name: "Gare Saint-Lazare", lines: "Normandie" },
    { name: "Gare d'Austerlitz", lines: "Intercités Sud-Ouest" },
    { name: "Gare de Bercy", lines: "Trains de nuit" }
  ];
  const jsonLD = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Gares & Aéroports - Taxi VSL Paris",
    "description": "Transferts vers tous les aéroports et gares parisiennes avec forfaits avantageux.",
    "url": "https://www.taxisparis-conventionnes.fr/taxis-gares-aeroports"
  };
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(
      SEOHead,
      {
        title: "Transfert Gares & Aéroports Paris | Tarifs Forfaitaires - Taxi VSL",
        description: "Transferts taxi et VSL vers les aéroports (CDG, Orly, Beauvais) et toutes les gares parisiennes. Tarifs forfaitaires avantageux, service 24/7.",
        keywords: ["transfert aéroport Paris", "taxi gare Paris", "navette CDG", "transfert Orly", "taxi gare du Nord", "transport gare Montparnasse"],
        canonical: "https://www.taxisparis-conventionnes.fr/taxis-gares-aeroports",
        jsonLD
      }
    ),
    /* @__PURE__ */ jsx("div", { className: "py-12", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-4", children: [
      /* @__PURE__ */ jsxs("div", { className: "text-center mb-12", children: [
        /* @__PURE__ */ jsx("h1", { className: "text-4xl font-bold text-gray-800 mb-4", children: "Gares & Aéroports" }),
        /* @__PURE__ */ jsx("p", { className: "text-lg text-gray-600 max-w-2xl mx-auto", children: "Transferts vers tous les aéroports et gares parisiennes avec forfaits avantageux" })
      ] }),
      /* @__PURE__ */ jsxs("section", { className: "mb-16", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 mb-8", children: [
          /* @__PURE__ */ jsx(Plane, { className: "text-blue-600", size: 32 }),
          /* @__PURE__ */ jsx("h2", { className: "text-3xl font-bold text-gray-800", children: "Aéroports" })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "grid md:grid-cols-3 gap-6 mb-8", children: airports.map((airport) => /* @__PURE__ */ jsxs(
          "div",
          {
            className: "bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition",
            children: [
              /* @__PURE__ */ jsxs("div", { className: "bg-gradient-to-br from-blue-600 to-blue-700 text-white p-6", children: [
                /* @__PURE__ */ jsx(Plane, { size: 40, className: "mb-3" }),
                /* @__PURE__ */ jsx("h3", { className: "text-2xl font-bold mb-1", children: airport.code }),
                /* @__PURE__ */ jsx("p", { className: "text-blue-100", children: airport.name })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "p-6", children: [
                /* @__PURE__ */ jsxs("div", { className: "space-y-3 mb-4", children: [
                  /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 text-gray-700", children: [
                    /* @__PURE__ */ jsx(MapPin, { size: 18, className: "text-blue-600" }),
                    /* @__PURE__ */ jsx("span", { children: airport.description })
                  ] }),
                  /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 text-gray-700", children: [
                    /* @__PURE__ */ jsx(Clock, { size: 18, className: "text-blue-600" }),
                    /* @__PURE__ */ jsx("span", { children: airport.duration })
                  ] })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4", children: [
                  /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 text-blue-900", children: [
                    /* @__PURE__ */ jsx(Euro, { size: 20 }),
                    /* @__PURE__ */ jsx("span", { className: "font-bold text-xl", children: airport.forfait })
                  ] }),
                  /* @__PURE__ */ jsx("p", { className: "text-sm text-blue-700 mt-1", children: "Forfait depuis Paris centre" })
                ] }),
                /* @__PURE__ */ jsx(
                  "button",
                  {
                    onClick: () => onNavigate("reservation"),
                    className: "w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition",
                    children: "Réserver"
                  }
                )
              ] })
            ]
          },
          airport.code
        )) }),
        /* @__PURE__ */ jsxs("div", { className: "bg-blue-50 border border-blue-200 rounded-lg p-6", children: [
          /* @__PURE__ */ jsxs("h3", { className: "font-semibold text-blue-900 mb-3 flex items-center gap-2", children: [
            /* @__PURE__ */ jsx(Plane, { size: 20 }),
            "Informations forfaits aéroports"
          ] }),
          /* @__PURE__ */ jsxs("ul", { className: "space-y-2 text-blue-800 text-sm", children: [
            /* @__PURE__ */ jsx("li", { children: "✓ Prix forfaitaires garantis sans surprise" }),
            /* @__PURE__ */ jsx("li", { children: "✓ Suivi du vol en temps réel" }),
            /* @__PURE__ */ jsx("li", { children: "✓ Attente incluse en cas de retard" }),
            /* @__PURE__ */ jsx("li", { children: "✓ Aide aux bagages" }),
            /* @__PURE__ */ jsx("li", { children: "✓ Paiement à bord (CB, espèces)" }),
            /* @__PURE__ */ jsx("li", { children: "✓ Véhicules confortables et spacieux" })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("section", { children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 mb-8", children: [
          /* @__PURE__ */ jsx(Train, { className: "text-blue-600", size: 32 }),
          /* @__PURE__ */ jsx("h2", { className: "text-3xl font-bold text-gray-800", children: "Gares parisiennes" })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8", children: stations.map((station) => /* @__PURE__ */ jsxs(
          "div",
          {
            className: "bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition",
            children: [
              /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-3 mb-3", children: [
                /* @__PURE__ */ jsx(Train, { className: "text-blue-600 flex-shrink-0", size: 24 }),
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx("h3", { className: "font-bold text-lg text-gray-800 mb-1", children: station.name }),
                  /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-600", children: station.lines })
                ] })
              ] }),
              /* @__PURE__ */ jsx(
                "button",
                {
                  onClick: () => onNavigate("reservation"),
                  className: "w-full mt-4 border-2 border-blue-600 text-blue-600 py-2 rounded-lg font-semibold hover:bg-blue-600 hover:text-white transition",
                  children: "Réserver"
                }
              )
            ]
          },
          station.name
        )) }),
        /* @__PURE__ */ jsxs("div", { className: "bg-gray-50 border border-gray-200 rounded-lg p-6", children: [
          /* @__PURE__ */ jsxs("h3", { className: "font-semibold text-gray-800 mb-3 flex items-center gap-2", children: [
            /* @__PURE__ */ jsx(Train, { size: 20 }),
            "Service gares"
          ] }),
          /* @__PURE__ */ jsxs("ul", { className: "space-y-2 text-gray-700 text-sm", children: [
            /* @__PURE__ */ jsx("li", { children: "✓ Prise en charge devant toutes les gares parisiennes" }),
            /* @__PURE__ */ jsx("li", { children: "✓ Suivi des horaires de train" }),
            /* @__PURE__ */ jsx("li", { children: "✓ Tarifs au compteur selon distance" }),
            /* @__PURE__ */ jsx("li", { children: "✓ Aide aux bagages volumineux" }),
            /* @__PURE__ */ jsx("li", { children: "✓ Réservation recommandée aux heures de pointe" })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("section", { className: "mt-12 bg-gradient-to-br from-blue-600 to-blue-800 text-white rounded-lg p-8 text-center", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-3xl font-bold mb-4", children: "Besoin d'un transfert ?" }),
        /* @__PURE__ */ jsx("p", { className: "text-xl text-blue-100 mb-6", children: "Réservez dès maintenant ou contactez-nous pour un devis personnalisé" }),
        /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap justify-center gap-4", children: [
          /* @__PURE__ */ jsxs(
            "button",
            {
              onClick: () => onNavigate("airport-transfer"),
              className: "bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition inline-flex items-center gap-2",
              children: [
                /* @__PURE__ */ jsx(Plane, { size: 20 }),
                "Réserver Aéroport"
              ]
            }
          ),
          /* @__PURE__ */ jsxs(
            "button",
            {
              onClick: () => onNavigate("station-transfer"),
              className: "bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition inline-flex items-center gap-2",
              children: [
                /* @__PURE__ */ jsx(Train, { size: 20 }),
                "Réserver Gare"
              ]
            }
          ),
          /* @__PURE__ */ jsxs(
            "a",
            {
              href: "tel:+33650366491",
              className: "border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition flex items-center gap-2",
              children: [
                /* @__PURE__ */ jsx(Phone, { size: 20 }),
                "06 50 36 64 91"
              ]
            }
          )
        ] })
      ] })
    ] }) })
  ] });
}
const FAQ_ITEMS$1 = [
  {
    question: "Qui peut bénéficier d'un taxi conventionné VSL ?",
    answer: "Tout patient dont l'état de santé nécessite un transport individuel peut bénéficier d'un taxi conventionné. C'est notamment le cas des patients atteints d'une Affection de Longue Durée (ALD), des personnes hospitalisées, de celles qui suivent des traitements réguliers (dialyse, chimiothérapie, radiothérapie) ou qui présentent une incapacité temporaire rendant impossible l'utilisation des transports en commun."
  },
  {
    question: "Le transport en taxi conventionné est-il remboursé par la Sécurité sociale ?",
    answer: "Oui. Avec une prescription médicale de transport (formulaire Cerfa S3138) établie par votre médecin, l'Assurance Maladie prend en charge une partie ou la totalité du coût du trajet. Pour les patients en ALD ou bénéficiaires de la Complémentaire Santé Solidaire, le remboursement peut atteindre 100 % grâce au tiers-payant, sans avance de frais."
  },
  {
    question: "Comment réserver un VSL ou un taxi conventionné ?",
    answer: "Vous pouvez réserver directement en ligne via notre formulaire de réservation sur ce site, ou par téléphone au 06 50 36 64 91. Nous vous recommandons de réserver au moins 24 heures à l'avance pour garantir la disponibilité. Pour les transports urgents, appelez-nous directement."
  },
  {
    question: "Quels départements d'Île-de-France êtes-vous couverts ?",
    answer: "Nous intervenons dans les cinq départements de l'Île-de-France : Paris (75), l'Essonne (91), les Hauts-de-Seine (92), la Seine-Saint-Denis (93) et le Val-de-Marne (94). Nous desservons l'ensemble des grands hôpitaux et cliniques de la région parisienne."
  }
];
const TRUST_ITEMS = [
  { icon: /* @__PURE__ */ jsx(Shield, { size: 18, className: "text-blue-600" }), label: "Chauffeurs agréés CPAM et conventionnés" },
  { icon: /* @__PURE__ */ jsx(CheckCircle, { size: 18, className: "text-blue-600" }), label: "Transport sécurisé, confortable et ponctuel" },
  { icon: /* @__PURE__ */ jsx(Clock, { size: 18, className: "text-blue-600" }), label: "Disponible 24h/24 – 7j/7, urgences incluses" },
  { icon: /* @__PURE__ */ jsx(Star, { size: 18, className: "text-blue-600" }), label: "Service fiable utilisé par des patients en Île-de-France" },
  { icon: /* @__PURE__ */ jsx(Award, { size: 18, className: "text-blue-600" }), label: "Véhicules conformes aux normes sanitaires en vigueur" },
  { icon: /* @__PURE__ */ jsx(Users, { size: 18, className: "text-blue-600" }), label: "Tiers-payant accepté – sans avance de frais" }
];
function About() {
  const [openFaq, setOpenFaq] = useState(null);
  const faqLD = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ_ITEMS$1.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer
      }
    }))
  };
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(
      SEOHead,
      {
        title: "Taxi Conventionné VSL Île-de-France | À propos de notre service",
        description: "Découvrez notre service de taxi conventionné VSL en Île-de-France (75, 91, 92, 93, 94). Agréés CPAM, disponibles 24h/24, tiers-payant accepté. Réservation rapide au 06 50 36 64 91.",
        keywords: [
          "taxi conventionné Paris",
          "VSL conventionné Île-de-France",
          "transport médical Paris",
          "transport sanitaire Île-de-France",
          "taxi CPAM Paris",
          "qui sommes-nous taxi VSL",
          "transport médical 75 91 92 93 94",
          "taxi médical agréé",
          "tiers payant transport médical"
        ],
        canonical: "https://www.taxisparis-conventionnes.fr/qui-sommes-nous",
        jsonLD: [
          generateJsonLD(),
          generateBreadcrumbList([
            { name: "Accueil", url: "/" },
            { name: "Qui sommes-nous", url: "/qui-sommes-nous" }
          ]),
          faqLD
        ]
      }
    ),
    /* @__PURE__ */ jsx("div", { className: "bg-blue-700 text-white py-3", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-4 flex flex-col sm:flex-row items-center justify-center gap-3 text-sm sm:text-base", children: [
      /* @__PURE__ */ jsx("span", { className: "font-medium", children: "Service fiable utilisé par des patients en Île-de-France" }),
      /* @__PURE__ */ jsxs(
        "a",
        {
          href: "tel:+33650366491",
          className: "inline-flex items-center gap-2 bg-white text-blue-700 font-bold px-4 py-1.5 rounded-full hover:bg-blue-50 transition-colors",
          "aria-label": "Appeler maintenant le 06 50 36 64 91",
          children: [
            /* @__PURE__ */ jsx(Phone, { size: 15, "aria-hidden": "true" }),
            "Appeler : 06 50 36 64 91"
          ]
        }
      )
    ] }) }),
    /* @__PURE__ */ jsx("div", { className: "py-8 sm:py-12 bg-gray-50 min-h-screen", children: /* @__PURE__ */ jsx("div", { className: "container mx-auto px-4 sm:px-6 lg:px-8", children: /* @__PURE__ */ jsxs("div", { className: "max-w-4xl mx-auto", children: [
      /* @__PURE__ */ jsxs("section", { className: "text-center mb-10", "aria-labelledby": "about-h1", children: [
        /* @__PURE__ */ jsxs("div", { className: "inline-flex items-center gap-2 bg-blue-100 text-blue-700 text-xs sm:text-sm font-semibold px-3 py-1.5 rounded-full mb-4", children: [
          /* @__PURE__ */ jsx(Shield, { size: 14, "aria-hidden": "true" }),
          "Agréé CPAM – Tiers-payant accepté"
        ] }),
        /* @__PURE__ */ jsx("h1", { id: "about-h1", className: "text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-800 mb-4 leading-tight", children: "Taxi conventionné VSL en Île-de-France – Qui sommes-nous ?" }),
        /* @__PURE__ */ jsx("p", { className: "text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto mb-6", children: "Votre partenaire de confiance pour tous vos transports médicaux en Île-de-France, remboursés par la CPAM." }),
        /* @__PURE__ */ jsxs("div", { className: "flex flex-col sm:flex-row items-center justify-center gap-4 text-sm text-gray-500", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-1", children: [
            [...Array(5)].map((_, i) => /* @__PURE__ */ jsx(Star, { size: 14, className: "text-yellow-500 fill-yellow-500", "aria-hidden": "true" }, i)),
            /* @__PURE__ */ jsx("span", { className: "ml-1.5 font-medium text-gray-700", children: "Service utilisé par des patients en Île-de-France" })
          ] }),
          /* @__PURE__ */ jsx("span", { className: "hidden sm:block text-gray-300", children: "|" }),
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-1.5", children: [
            /* @__PURE__ */ jsx(CheckCircle, { size: 14, className: "text-green-500", "aria-hidden": "true" }),
            /* @__PURE__ */ jsx("span", { children: "Disponible 24h/24 – 7j/7" })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("section", { className: "bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8 mb-8", "aria-labelledby": "intro-title", children: [
        /* @__PURE__ */ jsxs("p", { className: "text-base sm:text-lg text-gray-700 leading-relaxed mb-4", children: [
          "Notre service de ",
          /* @__PURE__ */ jsx("strong", { className: "text-blue-600", children: "taxi conventionné VSL" }),
          " est spécialisé dans le transport médical assis en Île-de-France. Agréés par la Caisse Primaire d'Assurance Maladie (CPAM), nous assurons le transport de patients vers tous les établissements de santé de Paris et de la région parisienne, dans les départements 75, 91, 92, 93 et 94."
        ] }),
        /* @__PURE__ */ jsx("p", { className: "text-base sm:text-lg text-gray-700 leading-relaxed mb-4", children: "Nos solutions de transport médical couvrent les consultations, hospitalisations programmées, séances de chimiothérapie, dialyse, radiothérapie, examens médicaux (IRM, scanner, radiologie) et la prise en charge des patients en Affection Longue Durée (ALD). Notre conventionnement CPAM permet à nos patients de bénéficier du tiers-payant sur prescription médicale de transport." }),
        /* @__PURE__ */ jsx("p", { className: "text-base sm:text-lg text-gray-700 leading-relaxed", children: "Disponibles 24h/24 et 7j/7, nos chauffeurs professionnels formés au transport sanitaire garantissent ponctualité, sécurité et accompagnement personnalisé pour chaque trajet médical." })
      ] }),
      /* @__PURE__ */ jsxs("section", { className: "mb-10", "aria-labelledby": "values-title", children: [
        /* @__PURE__ */ jsx("h2", { id: "values-title", className: "text-2xl sm:text-3xl font-bold text-gray-800 text-center mb-8", children: "Nos valeurs" }),
        /* @__PURE__ */ jsx("div", { className: "grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6", children: [
          { Icon: Shield, color: "blue", title: "Sécurité", desc: "Chauffeurs expérimentés et véhicules régulièrement contrôlés" },
          { Icon: Users, color: "blue", title: "Service", desc: "Écoute, courtoisie et assistance pour chaque patient" },
          { Icon: Award, color: "blue", title: "Excellence", desc: "Standards de qualité élevés pour votre satisfaction" },
          { Icon: Heart, color: "blue", title: "Engagement", desc: "Dévoués à votre confort et votre bien-être" }
        ].map(({ Icon, title, desc }) => /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-xl border border-gray-100 shadow-sm p-5 text-center hover:shadow-md transition-shadow", children: [
          /* @__PURE__ */ jsx("div", { className: "bg-blue-100 w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-3", children: /* @__PURE__ */ jsx(Icon, { className: "text-blue-600", size: 26, "aria-hidden": "true" }) }),
          /* @__PURE__ */ jsx("h3", { className: "font-bold text-sm sm:text-base mb-1.5", children: title }),
          /* @__PURE__ */ jsx("p", { className: "text-gray-500 text-xs sm:text-sm leading-relaxed", children: desc })
        ] }, title)) })
      ] }),
      /* @__PURE__ */ jsxs("section", { className: "bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8 mb-8 space-y-8", "aria-labelledby": "seo-content-title", children: [
        /* @__PURE__ */ jsx("h2", { id: "seo-content-title", className: "text-2xl sm:text-3xl font-bold text-gray-800", children: "Spécialiste du transport médical conventionné" }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("p", { className: "text-gray-700 leading-relaxed", children: "Notre service de taxi conventionné VSL est dédié au transport médical assis en Île-de-France. Nous accompagnons quotidiennement des patients vers les hôpitaux, cliniques, centres médicaux et cabinets spécialisés, avec une prise en charge adaptée à chaque situation médicale. Qu'il s'agisse d'un rendez-vous de routine chez le médecin, d'une hospitalisation programmée ou d'une séance de traitement lourd, notre équipe s'engage à assurer votre trajet dans les meilleures conditions." }),
          /* @__PURE__ */ jsx("p", { className: "mt-3 text-gray-700 leading-relaxed", children: "Nous desservons l'ensemble des établissements du réseau AP-HP ainsi que les cliniques privées et les centres de soins de la région parisienne : Pitié-Salpêtrière, Necker, Cochin, Lariboisière, Saint-Louis, Tenon, Georges Pompidou, Robert Debré, Institut Curie et bien d'autres." })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h2", { className: "text-xl font-bold text-gray-800 mb-3", children: "Transport agréé CPAM – Remboursement Assurance Maladie" }),
          /* @__PURE__ */ jsxs("p", { className: "text-gray-700 leading-relaxed", children: [
            "Nous sommes conventionnés par la CPAM, ce qui permet une ",
            /* @__PURE__ */ jsx("strong", { children: "prise en charge partielle ou totale" }),
            " de vos trajets médicaux selon votre situation. Pour les patients en ALD (Affection de Longue Durée), hospitalisés ou suivant un traitement régulier, le remboursement peut atteindre 100 % grâce au tiers-payant – sans avance de frais de votre part. Il vous suffit de présenter une prescription médicale de transport établie par votre médecin."
          ] }),
          /* @__PURE__ */ jsx("p", { className: "mt-3 text-gray-700 leading-relaxed", children: "Notre équipe administrative gère toutes les formalités avec la CPAM à votre place, ce qui vous évite toute démarche administrative complexe. Nous acceptons également les prises en charge des mutuelles complémentaires pour couvrir le ticket modérateur restant à votre charge." })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h2", { className: "text-xl font-bold text-gray-800 mb-3", children: "Une équipe professionnelle à votre service" }),
          /* @__PURE__ */ jsx("p", { className: "text-gray-700 leading-relaxed", children: "Nos chauffeurs sont rigoureusement sélectionnés, formés au transport sanitaire et à l'accompagnement de personnes vulnérables. Titulaires de l'agrément CPAM et de la carte professionnelle de chauffeur de taxi, ils connaissent parfaitement le réseau hospitalier et routier de l'Île-de-France." }),
          /* @__PURE__ */ jsxs("p", { className: "mt-3 text-gray-700 leading-relaxed", children: [
            "Nous mettons un point d'honneur à assurer un transport ",
            /* @__PURE__ */ jsx("strong", { children: "sécurisé, ponctuel et confortable" }),
            ". Nos véhicules sont régulièrement entretenus, conformes aux normes sanitaires en vigueur, et équipés pour accueillir des personnes à mobilité réduite selon les besoins. Chaque chauffeur veille à accompagner le patient depuis son domicile jusqu'à la salle d'attente et à assurer le retour en toute sérénité."
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h2", { className: "text-xl font-bold text-gray-800 mb-3", children: "Disponibilité 24h/24 et 7j/7" }),
          /* @__PURE__ */ jsx("p", { className: "text-gray-700 leading-relaxed", children: "Nous assurons vos déplacements médicaux à toute heure, y compris les urgences et les rendez-vous programmés très tôt le matin ou tard le soir. Notre centrale de réservation est joignable en permanence pour prendre en charge votre demande et affecter le chauffeur disponible le plus proche." }),
          /* @__PURE__ */ jsxs("p", { className: "mt-3 text-gray-700 leading-relaxed", children: [
            "Pour réserver votre transport, utilisez notre ",
            /* @__PURE__ */ jsx(Link, { to: "/reservation-taxi-vsl", className: "text-blue-600 hover:underline font-medium", children: "formulaire de réservation en ligne" }),
            " ou appelez directement le ",
            /* @__PURE__ */ jsx("a", { href: "tel:+33650366491", className: "text-blue-600 hover:underline font-medium", children: "06 50 36 64 91" }),
            ". Nous intervenons dans les 5 départements de notre ",
            /* @__PURE__ */ jsx(Link, { to: "/zones-desservies", className: "text-blue-600 hover:underline font-medium", children: "zone d'intervention" }),
            " en Île-de-France."
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("section", { className: "bg-blue-50 border border-blue-100 rounded-2xl p-6 sm:p-8 mb-8", "aria-labelledby": "trust-title", children: [
        /* @__PURE__ */ jsx("h2", { id: "trust-title", className: "text-2xl sm:text-3xl font-bold text-gray-800 mb-6 text-center", children: "Pourquoi nous faire confiance ?" }),
        /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4", children: TRUST_ITEMS.map((item, i) => /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-3 bg-white rounded-xl p-4 border border-blue-100 shadow-sm", children: [
          /* @__PURE__ */ jsx("div", { className: "mt-0.5 flex-shrink-0", children: item.icon }),
          /* @__PURE__ */ jsx("span", { className: "text-gray-700 text-sm sm:text-base font-medium", children: item.label })
        ] }, i)) })
      ] }),
      /* @__PURE__ */ jsxs("section", { className: "bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8 mb-8", "aria-labelledby": "certif-title", children: [
        /* @__PURE__ */ jsx("h2", { id: "certif-title", className: "text-2xl sm:text-3xl font-bold text-gray-800 text-center mb-6", children: "Nos certifications" }),
        /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6", children: [
          { title: "Licence de taxi", desc: "Agréé Préfecture de Police de Paris" },
          { title: "Conventionnement CPAM", desc: "Transport médical assis professionnalisé" },
          { title: "Assurance professionnelle", desc: "Couverture complète passagers et bagages" },
          { title: "Carte professionnelle", desc: "Chauffeurs diplômés et certifiés" }
        ].map(({ title, desc }) => /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-3", children: [
          /* @__PURE__ */ jsx(CheckCircle, { className: "text-blue-600 flex-shrink-0 mt-0.5", size: 20, "aria-hidden": "true" }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("h3", { className: "font-semibold text-sm sm:text-base mb-0.5", children: title }),
            /* @__PURE__ */ jsx("p", { className: "text-gray-500 text-xs sm:text-sm", children: desc })
          ] })
        ] }, title)) })
      ] }),
      /* @__PURE__ */ jsxs("section", { className: "bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8 mb-8", "aria-labelledby": "zones-title", children: [
        /* @__PURE__ */ jsxs("h2", { id: "zones-title", className: "text-xl sm:text-2xl font-bold text-gray-800 mb-5 flex items-center gap-2", children: [
          /* @__PURE__ */ jsx(MapPin, { size: 22, className: "text-blue-600", "aria-hidden": "true" }),
          "Nos zones d'intervention"
        ] }),
        /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-3", children: [
          { label: "Paris (75)", href: "/taxi-conventionne-paris-75" },
          { label: "Essonne (91)", href: "/taxi-conventionne-essonne-91" },
          { label: "Hauts-de-Seine (92)", href: "/taxi-conventionne-hauts-de-seine-92" },
          { label: "Seine-Saint-Denis (93)", href: "/taxi-conventionne-seine-saint-denis-93" },
          { label: "Val-de-Marne (94)", href: "/taxi-conventionne-val-de-marne-94" },
          { label: "Toutes les zones desservies", href: "/zones-desservies" }
        ].map((dep) => /* @__PURE__ */ jsxs(
          Link,
          {
            to: dep.href,
            className: "flex items-center gap-2 bg-gray-50 hover:bg-blue-50 border border-gray-200 hover:border-blue-200 rounded-lg px-4 py-3 text-blue-700 font-semibold text-sm transition-colors",
            children: [
              /* @__PURE__ */ jsx(MapPin, { size: 13, "aria-hidden": "true" }),
              "Taxi conventionné – ",
              dep.label
            ]
          },
          dep.href
        )) })
      ] }),
      /* @__PURE__ */ jsxs("section", { className: "mb-10", "aria-labelledby": "faq-title", children: [
        /* @__PURE__ */ jsxs("div", { className: "text-center mb-6", children: [
          /* @__PURE__ */ jsx("h2", { id: "faq-title", className: "text-2xl sm:text-3xl font-bold text-gray-800", children: "Questions fréquentes sur notre service" }),
          /* @__PURE__ */ jsx("p", { className: "text-gray-500 mt-2 text-sm sm:text-base", children: "Tout ce qu'il faut savoir sur le taxi conventionné VSL en Île-de-France." })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "space-y-3", children: FAQ_ITEMS$1.map((item, index) => /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden", children: [
          /* @__PURE__ */ jsxs(
            "button",
            {
              onClick: () => setOpenFaq(openFaq === index ? null : index),
              className: "w-full flex items-center justify-between gap-4 px-5 py-4 text-left hover:bg-gray-50 transition-colors",
              "aria-expanded": openFaq === index,
              "aria-controls": `faq-answer-${index}`,
              children: [
                /* @__PURE__ */ jsx("span", { className: "font-semibold text-gray-800 text-sm sm:text-base", children: item.question }),
                openFaq === index ? /* @__PURE__ */ jsx(ChevronUp, { size: 18, className: "text-blue-600 flex-shrink-0", "aria-hidden": "true" }) : /* @__PURE__ */ jsx(ChevronDown, { size: 18, className: "text-gray-400 flex-shrink-0", "aria-hidden": "true" })
              ]
            }
          ),
          openFaq === index && /* @__PURE__ */ jsx(
            "div",
            {
              id: `faq-answer-${index}`,
              className: "px-5 pb-5 text-gray-600 text-sm sm:text-base leading-relaxed border-t border-gray-100",
              children: /* @__PURE__ */ jsx("p", { className: "mt-3", children: item.answer })
            }
          )
        ] }, index)) })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "bg-blue-700 text-white rounded-2xl p-6 sm:p-8 text-center", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-xl sm:text-2xl font-bold mb-2", children: "Besoin d'un transport médical en Île-de-France ?" }),
        /* @__PURE__ */ jsx("p", { className: "text-blue-100 text-sm sm:text-base mb-6", children: "Réservez en ligne ou appelez-nous directement. Disponible 24h/24 – 7j/7." }),
        /* @__PURE__ */ jsxs("div", { className: "flex flex-col sm:flex-row gap-3 justify-center", children: [
          /* @__PURE__ */ jsxs(
            Link,
            {
              to: "/reservation-taxi-vsl",
              className: "inline-flex items-center justify-center gap-2 bg-white text-blue-700 font-bold px-6 py-3 rounded-lg hover:bg-blue-50 transition-colors",
              children: [
                /* @__PURE__ */ jsx(CalendarCheck, { size: 18, "aria-hidden": "true" }),
                "Réserver maintenant"
              ]
            }
          ),
          /* @__PURE__ */ jsxs(
            "a",
            {
              href: "tel:+33650366491",
              className: "inline-flex items-center justify-center gap-2 border-2 border-white text-white font-bold px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors",
              children: [
                /* @__PURE__ */ jsx(Phone, { size: 18, "aria-hidden": "true" }),
                "Appeler : 06 50 36 64 91"
              ]
            }
          )
        ] })
      ] })
    ] }) }) })
  ] });
}
const DEPARTMENTS = [
  { label: "Paris (75)", href: "/taxi-conventionne-paris-75" },
  { label: "Essonne (91)", href: "/taxi-conventionne-essonne-91" },
  { label: "Hauts-de-Seine (92)", href: "/taxi-conventionne-hauts-de-seine-92" },
  { label: "Seine-Saint-Denis (93)", href: "/taxi-conventionne-seine-saint-denis-93" },
  { label: "Val-de-Marne (94)", href: "/taxi-conventionne-val-de-marne-94" }
];
const FAQ_ITEMS = [
  {
    question: "Quelle est la différence entre un taxi conventionné et une ambulance ?",
    answer: "L'ambulance est réservée aux patients nécessitant une surveillance médicale ou un transport allongé. Le taxi conventionné convient aux patients dits « assis », capables de se déplacer sans assistance médicale particulière. Sur prescription médicale, les deux sont pris en charge par la CPAM. Le taxi conventionné est souvent prescrit pour les consultations, dialyses ou séances de chimiothérapie des patients autonomes."
  },
  {
    question: "Comment fonctionne le remboursement CPAM pour un taxi conventionné ?",
    answer: "Avec une prescription médicale de transport (formulaire Cerfa S3138) signée par votre médecin, votre taxi conventionné est pris en charge par la CPAM à 65 % du tarif conventionné, et jusqu'à 100 % pour les patients en ALD, CMU-C ou maternité. Notre service pratique la tierce payante : vous n'avancez pas les frais, la CPAM nous règle directement."
  },
  {
    question: "Peut-on réserver un taxi conventionné pour un trajet régulier (dialyse, chimio) ?",
    answer: "Oui. Une ordonnance de série établie par votre médecin permet de couvrir plusieurs séances sans renouvellement à chaque trajet. Nous planifions vos trajets récurrents à l'avance, garantissant ponctualité et disponibilité pour vos séances de dialyse, chimiothérapie ou radiothérapie."
  },
  {
    question: "Le service de taxi VSL est-il disponible la nuit et les week-ends ?",
    answer: "Notre service est disponible 24h/24, 7j/7, y compris les jours fériés. Que ce soit pour une hospitalisation programmée tôt le matin, une sortie d'hôpital le week-end ou un rendez-vous médical en soirée, nos chauffeurs conventionnés sont joignables au 06 50 36 64 91."
  },
  {
    question: "Quels documents dois-je préparer avant ma réservation ?",
    answer: "Avant de réserver, munissez-vous de votre carte Vitale, de votre prescription médicale de transport (Cerfa S3138) et, si applicable, de votre attestation d'ALD ou CMU-C. Pour les transports en série, l'ordonnance de série suffit. Si vous n'avez pas encore la prescription, vous pouvez quand même réserver : votre médecin peut l'établir avant le jour du transport."
  }
];
const jsonLDWebPage = {
  "@context": "https://schema.org",
  "@type": "Blog",
  name: "Blog Taxi VSL Conventionné CPAM Île-de-France",
  description: "Conseils pratiques, guides et actualités sur le transport médical en taxi conventionné et VSL en Île-de-France. Tout savoir sur la prise en charge CPAM, les remboursements et les démarches.",
  url: "https://www.taxisparis-conventionnes.fr/blog",
  publisher: {
    "@type": "Organization",
    name: "Taxis Paris Conventionnés",
    url: "https://www.taxisparis-conventionnes.fr"
  },
  breadcrumb: {
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Accueil", item: "https://www.taxisparis-conventionnes.fr/" },
      { "@type": "ListItem", position: 2, name: "Blog", item: "https://www.taxisparis-conventionnes.fr/blog" }
    ]
  }
};
const jsonLDFAQ = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQ_ITEMS.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: { "@type": "Answer", text: item.answer }
  }))
};
const jsonLDMedical = {
  "@context": "https://schema.org",
  "@type": "MedicalBusiness",
  name: "Taxis Paris Conventionnés",
  url: "https://www.taxisparis-conventionnes.fr/",
  telephone: "+33650366491",
  areaServed: ["Paris", "Essonne", "Hauts-de-Seine", "Seine-Saint-Denis", "Val-de-Marne"],
  openingHours: "Mo-Su 00:00-23:59",
  description: "Service de taxi conventionné CPAM et VSL en Île-de-France. Transports médicaux remboursés pour consultations, dialyse, chimiothérapie, hospitalisations."
};
function Blog({ onNavigate: _onNavigate }) {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openFaq, setOpenFaq] = useState(null);
  useEffect(() => {
    fetchPosts();
  }, []);
  const fetchPosts = async () => {
    const { data } = await supabase.from("blog_posts").select("*").eq("published", true).order("published_at", { ascending: false });
    if (data) setPosts(data);
    setLoading(false);
  };
  const formatDate = (dateString) => {
    if (!dateString) return "";
    return new Date(dateString).toLocaleDateString("fr-FR", {
      day: "numeric",
      month: "long",
      year: "numeric"
    });
  };
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(
      SEOHead,
      {
        title: "Blog Taxi VSL Conventionné CPAM | Guides & Conseils Île-de-France",
        description: "Conseils pratiques et guides sur le taxi conventionné et VSL remboursé CPAM en Île-de-France. Remboursements, prescriptions médicales, zones desservies. Disponible 24h/24.",
        keywords: [
          "blog taxi conventionné",
          "actualités transport médical",
          "conseils VSL CPAM",
          "guide taxi conventionné Paris",
          "remboursement transport médical",
          "prescription médicale transport",
          "taxi conventionné Île-de-France"
        ],
        canonical: "https://www.taxisparis-conventionnes.fr/blog",
        jsonLD: [jsonLDWebPage, jsonLDFAQ, jsonLDMedical]
      }
    ),
    /* @__PURE__ */ jsx("section", { className: "bg-gradient-to-br from-blue-600 to-blue-700 text-white py-12 sm:py-16", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-4 text-center", children: [
      /* @__PURE__ */ jsxs("div", { className: "inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 text-sm font-medium mb-4", children: [
        /* @__PURE__ */ jsx(BookOpen, { size: 14, "aria-hidden": "true" }),
        "Guides & conseils transport médical"
      ] }),
      /* @__PURE__ */ jsxs("h1", { className: "text-3xl sm:text-4xl md:text-5xl font-bold mb-4 leading-tight", children: [
        "Blog Taxi VSL Conventionné",
        /* @__PURE__ */ jsx("br", { className: "hidden sm:block" }),
        " en Île-de-France"
      ] }),
      /* @__PURE__ */ jsx("p", { className: "text-lg sm:text-xl text-white/90 max-w-2xl mx-auto mb-8", children: "Tout savoir sur le transport médical remboursé CPAM : démarches, remboursements, zones desservies et conseils pratiques" }),
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col sm:flex-row justify-center gap-3", children: [
        /* @__PURE__ */ jsxs(
          Link,
          {
            to: "/reservation-taxi-vsl",
            className: "inline-flex items-center justify-center gap-2 bg-white text-blue-600 font-bold px-6 py-3 rounded-xl hover:bg-blue-50 transition shadow-lg",
            children: [
              "Réserver maintenant",
              /* @__PURE__ */ jsx(ArrowRight, { size: 18, "aria-hidden": "true" })
            ]
          }
        ),
        /* @__PURE__ */ jsxs(
          "a",
          {
            href: "tel:+33650366491",
            className: "inline-flex items-center justify-center gap-2 bg-white/10 border-2 border-white text-white font-bold px-6 py-3 rounded-xl hover:bg-white hover:text-blue-600 transition",
            children: [
              /* @__PURE__ */ jsx(Phone, { size: 16, "aria-hidden": "true" }),
              "06 50 36 64 91"
            ]
          }
        )
      ] })
    ] }) }),
    /* @__PURE__ */ jsx("section", { className: "py-12 bg-gray-50", "aria-label": "Articles du blog", children: /* @__PURE__ */ jsx("div", { className: "container mx-auto px-4", children: loading ? /* @__PURE__ */ jsxs("div", { className: "text-center py-12", children: [
      /* @__PURE__ */ jsx("div", { className: "animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto", role: "status", "aria-label": "Chargement" }),
      /* @__PURE__ */ jsx("p", { className: "text-gray-600 mt-4", children: "Chargement des articles..." })
    ] }) : posts.length === 0 ? /* @__PURE__ */ jsxs("div", { className: "text-center py-12", children: [
      /* @__PURE__ */ jsx(BookOpen, { size: 48, className: "mx-auto text-gray-300 mb-4", "aria-hidden": "true" }),
      /* @__PURE__ */ jsx("p", { className: "text-gray-600 text-lg font-medium", children: "Aucun article publié pour le moment." }),
      /* @__PURE__ */ jsx("p", { className: "text-gray-500 mt-2", children: "Revenez bientôt pour découvrir nos nouveaux contenus !" })
    ] }) : /* @__PURE__ */ jsx("div", { className: "grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto", children: posts.map((post) => /* @__PURE__ */ jsxs(
      "article",
      {
        className: "bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow overflow-hidden group",
        children: [
          post.featured_image_url && /* @__PURE__ */ jsx("div", { className: "h-48 overflow-hidden bg-gray-100", children: /* @__PURE__ */ jsx(
            "img",
            {
              src: post.featured_image_url,
              alt: post.title,
              className: "w-full h-full object-cover group-hover:scale-105 transition duration-300",
              loading: "lazy",
              onError: (e) => {
                e.currentTarget.style.display = "none";
              }
            }
          ) }),
          /* @__PURE__ */ jsxs("div", { className: "p-6", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between mb-3", children: [
              /* @__PURE__ */ jsx("span", { className: "text-xs font-semibold text-blue-600 bg-blue-50 px-3 py-1 rounded-full", children: "Article" }),
              post.published_at && /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-1 text-gray-500 text-xs", children: [
                /* @__PURE__ */ jsx(Calendar, { size: 13, "aria-hidden": "true" }),
                /* @__PURE__ */ jsx("time", { dateTime: post.published_at, children: formatDate(post.published_at) })
              ] })
            ] }),
            /* @__PURE__ */ jsx("h2", { className: "text-lg font-bold text-gray-800 mb-3 group-hover:text-blue-600 transition leading-snug", children: post.title }),
            post.excerpt && /* @__PURE__ */ jsx("p", { className: "text-gray-600 mb-4 text-sm line-clamp-3", children: post.excerpt }),
            /* @__PURE__ */ jsxs(
              Link,
              {
                to: `/blog/${post.slug}`,
                className: "inline-flex items-center gap-1.5 text-blue-600 font-semibold text-sm hover:gap-3 transition-all",
                "aria-label": `Lire l'article : ${post.title}`,
                children: [
                  "Lire la suite",
                  /* @__PURE__ */ jsx(ArrowRight, { size: 16, "aria-hidden": "true" })
                ]
              }
            )
          ] })
        ]
      },
      post.id
    )) }) }) }),
    /* @__PURE__ */ jsx("section", { className: "py-12 bg-white", "aria-label": "Guide du transport médical conventionné", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-4 max-w-4xl", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-2xl sm:text-3xl font-bold text-gray-800 mb-8 text-center", children: "Guide complet du transport médical en taxi conventionné" }),
      /* @__PURE__ */ jsxs("div", { className: "mb-8", children: [
        /* @__PURE__ */ jsxs("h3", { className: "text-xl font-bold text-blue-700 mb-3 flex items-center gap-2", children: [
          /* @__PURE__ */ jsx(CheckCircle, { size: 20, className: "text-blue-500 flex-shrink-0", "aria-hidden": "true" }),
          "Qu'est-ce qu'un taxi conventionné VSL CPAM ?"
        ] }),
        /* @__PURE__ */ jsxs("p", { className: "text-gray-700 leading-relaxed mb-3", children: [
          "Un ",
          /* @__PURE__ */ jsx("strong", { children: "taxi conventionné" }),
          " est un véhicule agréé par la Caisse Primaire d'Assurance Maladie (CPAM) pour assurer les transports médicaux non urgents. Il s'adresse aux patients dits « assis », c'est-à-dire autonomes dans leurs déplacements et n'ayant pas besoin d'une surveillance médicale pendant le trajet. Cette catégorie se distingue du VSL (Véhicule Sanitaire Léger), conduit par un auxiliaire ambulancier, et de l'ambulance, réservée aux situations d'urgence ou de grande dépendance."
        ] }),
        /* @__PURE__ */ jsx("p", { className: "text-gray-700 leading-relaxed", children: "Pour qu'un transport soit qualifié de « conventionné », le chauffeur doit être titulaire d'un agrément délivré par la CPAM et respecter un tarif conventionné fixé par la Sécurité sociale. Notre entreprise est conventionnée en Île-de-France et intervient sur Paris (75), l'Essonne (91), les Hauts-de-Seine (92), la Seine-Saint-Denis (93) et le Val-de-Marne (94), 24h/24, 7j/7." })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "mb-8", children: [
        /* @__PURE__ */ jsxs("h3", { className: "text-xl font-bold text-blue-700 mb-3 flex items-center gap-2", children: [
          /* @__PURE__ */ jsx(CheckCircle, { size: 20, className: "text-blue-500 flex-shrink-0", "aria-hidden": "true" }),
          "Conditions et démarches pour obtenir le remboursement CPAM"
        ] }),
        /* @__PURE__ */ jsxs("p", { className: "text-gray-700 leading-relaxed mb-3", children: [
          "Le remboursement de votre transport médical repose sur trois piliers : une ",
          /* @__PURE__ */ jsx("strong", { children: "prescription médicale de transport" }),
          " (formulaire Cerfa S3138) établie par votre médecin, un trajet vers un établissement de soin reconnu par l'Assurance Maladie, et une incapacité à utiliser les transports en commun justifiée médicalement. Sans prescription, le transport reste possible mais entièrement à votre charge."
        ] }),
        /* @__PURE__ */ jsxs("p", { className: "text-gray-700 leading-relaxed mb-3", children: [
          "Le taux de prise en charge est de 65 % du tarif conventionné pour la grande majorité des assurés. Ce taux monte à ",
          /* @__PURE__ */ jsx("strong", { children: "100 % pour les patients en Affection de Longue Durée (ALD)" }),
          ", les bénéficiaires de la Complémentaire Santé Solidaire (CSS), les femmes enceintes à partir du 6e mois, les victimes d'accident du travail et les enfants mineurs hospitalisés. La part restante (35 %) est généralement prise en charge par votre mutuelle complémentaire."
        ] }),
        /* @__PURE__ */ jsxs("p", { className: "text-gray-700 leading-relaxed", children: [
          "Pour les transports répétitifs (dialyse, chimiothérapie, radiothérapie), votre médecin peut établir une ",
          /* @__PURE__ */ jsx("strong", { children: "ordonnance de série" }),
          " valable plusieurs mois, évitant le renouvellement à chaque séance. Il suffit de nous transmettre ce document une seule fois lors de votre première réservation."
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "mb-8", children: [
        /* @__PURE__ */ jsxs("h3", { className: "text-xl font-bold text-blue-700 mb-3 flex items-center gap-2", children: [
          /* @__PURE__ */ jsx(CheckCircle, { size: 20, className: "text-blue-500 flex-shrink-0", "aria-hidden": "true" }),
          "Types de transports médicaux pris en charge"
        ] }),
        /* @__PURE__ */ jsxs("p", { className: "text-gray-700 leading-relaxed mb-3", children: [
          "Notre service de taxi conventionné couvre l'ensemble des déplacements médicaux non urgents : consultations chez le médecin généraliste ou spécialiste, bilans biologiques et radiologiques, hospitalisations programmées et sorties d'établissement, séances de rééducation fonctionnelle, kinésithérapie, orthophonie et psychomotricité. Nous assurons également les ",
          /* @__PURE__ */ jsx("strong", { children: "transferts inter-hospitaliers" }),
          " entre établissements de santé d'Île-de-France."
        ] }),
        /* @__PURE__ */ jsxs("p", { className: "text-gray-700 leading-relaxed mb-3", children: [
          "Pour les patients en traitement lourd, nous proposons une prise en charge sur mesure : planification des séances de ",
          /* @__PURE__ */ jsx("strong", { children: "dialyse rénale" }),
          " (2 à 3 fois par semaine), accompagnement tout au long des cures de ",
          /* @__PURE__ */ jsx("strong", { children: "chimiothérapie et de radiothérapie" }),
          ", suivi des hospitalisations de jour. Nos chauffeurs sont formés à l'accueil des patients fragiles, âgés ou en situation de handicap moteur léger."
        ] }),
        /* @__PURE__ */ jsx("p", { className: "text-gray-700 leading-relaxed", children: "Les transports vers les aéroports de Roissy-Charles-de-Gaulle et d'Orly pour raison médicale (rapatriement sanitaire, traitement à l'étranger) sont également pris en charge sous conditions particulières. Contactez-nous pour étudier votre situation spécifique." })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "mb-8", children: [
        /* @__PURE__ */ jsxs("h3", { className: "text-xl font-bold text-blue-700 mb-3 flex items-center gap-2", children: [
          /* @__PURE__ */ jsx(CheckCircle, { size: 20, className: "text-blue-500 flex-shrink-0", "aria-hidden": "true" }),
          "Pourquoi lire notre blog sur le taxi conventionné ?"
        ] }),
        /* @__PURE__ */ jsx("p", { className: "text-gray-700 leading-relaxed mb-4", children: "Ce blog a pour vocation d'informer les patients, leurs proches et les professionnels de santé sur tout ce qui touche au transport médical remboursé en Île-de-France. Vous y trouverez des guides pratiques sur les démarches CPAM, des comparatifs entre les modes de transport sanitaire, des conseils pour préparer votre prise en charge et des actualités réglementaires sur les remboursements." }),
        /* @__PURE__ */ jsx("p", { className: "text-gray-700 leading-relaxed mb-5", children: "Nos chauffeurs interviennent dans les cinq départements suivants. Consultez la page de votre département pour connaître les villes desservies et les établissements hospitaliers à proximité de chez vous :" }),
        /* @__PURE__ */ jsx("div", { className: "grid sm:grid-cols-2 gap-3", children: DEPARTMENTS.map((dept) => {
          var _a2;
          return /* @__PURE__ */ jsxs(
            Link,
            {
              to: dept.href,
              className: "flex items-center gap-3 bg-blue-50 border border-blue-100 rounded-xl px-4 py-3 hover:bg-blue-100 hover:border-blue-300 transition group",
              "aria-label": `Taxi conventionné ${dept.label}`,
              children: [
                /* @__PURE__ */ jsx("span", { className: "flex-shrink-0 w-9 h-9 bg-blue-600 text-white rounded-lg flex items-center justify-center font-bold text-xs", children: (_a2 = dept.label.match(/\d+/)) == null ? void 0 : _a2[0] }),
                /* @__PURE__ */ jsxs("span", { className: "font-semibold text-gray-800 text-sm group-hover:text-blue-700 transition", children: [
                  "Taxi conventionné ",
                  dept.label
                ] }),
                /* @__PURE__ */ jsx(ArrowRight, { size: 14, className: "ml-auto text-blue-400 group-hover:translate-x-1 transition", "aria-hidden": "true" })
              ]
            },
            dept.label
          );
        }) })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "mb-4", children: [
        /* @__PURE__ */ jsxs("h3", { className: "text-xl font-bold text-blue-700 mb-3 flex items-center gap-2", children: [
          /* @__PURE__ */ jsx(CheckCircle, { size: 20, className: "text-blue-500 flex-shrink-0", "aria-hidden": "true" }),
          "Conseils pratiques pour réserver votre taxi VSL"
        ] }),
        /* @__PURE__ */ jsx("p", { className: "text-gray-700 leading-relaxed mb-3", children: "Pour une réservation sans encombre, pensez à réunir vos documents avant de soumettre votre demande : carte Vitale, prescription médicale de transport (Cerfa S3138) et, le cas échéant, attestation d'ALD ou de CMU-C. Si vous bénéficiez d'une prise en charge à 100 %, indiquez-le lors de votre réservation afin que notre équipe prépare les documents de facturation directe avec la CPAM." }),
        /* @__PURE__ */ jsxs("p", { className: "text-gray-700 leading-relaxed mb-3", children: [
          "Réservez idéalement ",
          /* @__PURE__ */ jsx("strong", { children: "24 à 48 heures à l'avance" }),
          " pour les rendez-vous programmés, et au moins 72 heures pour les hospitalisations longue durée. Pour les transports récurrents, une seule réservation suffit : nous planifions l'ensemble des séances sur la durée de votre traitement."
        ] }),
        /* @__PURE__ */ jsxs("p", { className: "text-gray-700 leading-relaxed", children: [
          "Pour les situations urgentes ou non programmées, notre numéro est disponible 24h/24 au",
          " ",
          /* @__PURE__ */ jsx("a", { href: "tel:+33650366491", className: "text-blue-600 font-semibold hover:underline", children: "06 50 36 64 91" }),
          ". Nos chauffeurs s'adaptent aux imprévus et font leur possible pour intervenir dans les meilleurs délais, même en dehors des horaires habituels."
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ jsx("section", { className: "py-12 bg-gray-50", "aria-label": "Questions fréquentes", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-4 max-w-3xl", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-2xl sm:text-3xl font-bold text-gray-800 text-center mb-8", children: "Questions fréquentes" }),
      /* @__PURE__ */ jsx("div", { className: "space-y-3", children: FAQ_ITEMS.map((item, index) => {
        const isOpen = openFaq === index;
        return /* @__PURE__ */ jsxs(
          "div",
          {
            className: "bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden",
            children: [
              /* @__PURE__ */ jsxs(
                "button",
                {
                  className: "w-full flex items-center justify-between gap-4 px-5 py-4 text-left hover:bg-gray-50 transition focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-inset",
                  "aria-expanded": isOpen,
                  "aria-controls": `blog-faq-answer-${index}`,
                  id: `blog-faq-question-${index}`,
                  onClick: () => setOpenFaq(isOpen ? null : index),
                  type: "button",
                  children: [
                    /* @__PURE__ */ jsx("span", { className: "font-semibold text-gray-800 text-sm sm:text-base pr-2", children: item.question }),
                    /* @__PURE__ */ jsx("span", { className: "flex-shrink-0 text-blue-600", "aria-hidden": "true", children: isOpen ? /* @__PURE__ */ jsx(ChevronUp, { size: 20 }) : /* @__PURE__ */ jsx(ChevronDown, { size: 20 }) })
                  ]
                }
              ),
              /* @__PURE__ */ jsx(
                "div",
                {
                  id: `blog-faq-answer-${index}`,
                  role: "region",
                  "aria-labelledby": `blog-faq-question-${index}`,
                  hidden: !isOpen,
                  children: /* @__PURE__ */ jsx("p", { className: "px-5 pb-5 text-gray-700 leading-relaxed text-sm sm:text-base border-t border-gray-100 pt-3", children: item.answer })
                }
              )
            ]
          },
          index
        );
      }) })
    ] }) }),
    /* @__PURE__ */ jsx("section", { className: "py-12 bg-white", "aria-label": "Réserver un transport médical", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-4 max-w-2xl text-center", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-2xl font-bold text-gray-800 mb-3", children: "Besoin d'un transport médical remboursé ?" }),
      /* @__PURE__ */ jsx("p", { className: "text-gray-600 mb-6", children: "Réservez votre taxi conventionné VSL en quelques minutes. Disponible 24h/24, 7j/7 dans toute l'Île-de-France." }),
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col sm:flex-row justify-center gap-3", children: [
        /* @__PURE__ */ jsxs(
          Link,
          {
            to: "/reservation-taxi-vsl",
            className: "inline-flex items-center justify-center gap-2 bg-blue-600 text-white font-bold px-8 py-3.5 rounded-xl hover:bg-blue-700 transition shadow-md",
            children: [
              "Réserver maintenant",
              /* @__PURE__ */ jsx(ArrowRight, { size: 18, "aria-hidden": "true" })
            ]
          }
        ),
        /* @__PURE__ */ jsxs(
          "a",
          {
            href: "tel:+33650366491",
            className: "inline-flex items-center justify-center gap-2 border-2 border-blue-600 text-blue-600 font-bold px-8 py-3.5 rounded-xl hover:bg-blue-600 hover:text-white transition",
            children: [
              /* @__PURE__ */ jsx(Phone, { size: 16, "aria-hidden": "true" }),
              "Appeler maintenant"
            ]
          }
        )
      ] })
    ] }) })
  ] });
}
function BlogPost() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (slug) {
      fetchPost();
    }
  }, [slug]);
  const fetchPost = async () => {
    const { data } = await supabase.from("blog_posts").select("*").eq("slug", slug).eq("published", true).maybeSingle();
    if (data) {
      setPost(data);
    }
    setLoading(false);
  };
  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" });
  };
  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: post == null ? void 0 : post.title,
        text: post == null ? void 0 : post.excerpt,
        url: window.location.href
      });
    }
  };
  if (loading) {
    return /* @__PURE__ */ jsx("div", { className: "min-h-screen flex items-center justify-center bg-gray-50", children: /* @__PURE__ */ jsxs("div", { className: "text-center", children: [
      /* @__PURE__ */ jsx("div", { className: "animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto" }),
      /* @__PURE__ */ jsx("p", { className: "text-gray-600 mt-4", children: "Chargement de l'article..." })
    ] }) });
  }
  if (!post) {
    return /* @__PURE__ */ jsx("div", { className: "min-h-screen flex items-center justify-center bg-gray-50", children: /* @__PURE__ */ jsxs("div", { className: "text-center", children: [
      /* @__PURE__ */ jsx("h1", { className: "text-4xl font-bold text-gray-800 mb-4", children: "Article introuvable" }),
      /* @__PURE__ */ jsx("p", { className: "text-gray-600 mb-8", children: "Cet article n'existe pas ou n'est plus disponible." }),
      /* @__PURE__ */ jsx(
        "button",
        {
          onClick: () => navigate("/blog/"),
          className: "bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition",
          children: "Retour au blog"
        }
      )
    ] }) });
  }
  const keywords = post.meta_keywords ? post.meta_keywords.split(",").map((k) => k.trim()) : [];
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(
      SEOHead,
      {
        title: post.title,
        description: post.meta_description || post.excerpt,
        keywords
      }
    ),
    /* @__PURE__ */ jsx("article", { className: "bg-gray-50 py-12", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-4 max-w-4xl", children: [
      /* @__PURE__ */ jsxs(
        "button",
        {
          onClick: () => navigate("/blog/"),
          className: "flex items-center gap-2 text-gray-600 hover:text-gray-800 mb-8 transition",
          children: [
            /* @__PURE__ */ jsx(ArrowLeft, { size: 20 }),
            "Retour au blog"
          ]
        }
      ),
      post.featured_image_url && /* @__PURE__ */ jsx("div", { className: "w-full h-96 rounded-2xl overflow-hidden mb-8 shadow-xl", children: /* @__PURE__ */ jsx(
        "img",
        {
          src: post.featured_image_url,
          alt: post.title,
          className: "w-full h-full object-cover",
          onError: (e) => {
            e.currentTarget.style.display = "none";
          }
        }
      ) }),
      /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-2xl shadow-lg p-8 md:p-12", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4 mb-6 text-sm text-gray-600", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsx(Calendar, { size: 16 }),
            /* @__PURE__ */ jsx("span", { children: formatDate(post.published_at) })
          ] }),
          /* @__PURE__ */ jsxs(
            "button",
            {
              onClick: handleShare,
              className: "flex items-center gap-2 hover:text-blue-600 transition",
              children: [
                /* @__PURE__ */ jsx(Share2, { size: 16 }),
                /* @__PURE__ */ jsx("span", { children: "Partager" })
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsx("h1", { className: "text-4xl md:text-5xl font-bold text-gray-800 mb-6 leading-tight", children: post.title }),
        post.excerpt && /* @__PURE__ */ jsx("p", { className: "text-xl text-gray-600 mb-8 leading-relaxed border-l-4 border-blue-600 pl-6 italic", children: post.excerpt }),
        /* @__PURE__ */ jsx(
          "div",
          {
            className: "prose prose-lg max-w-none",
            dangerouslySetInnerHTML: { __html: post.content },
            style: {
              lineHeight: "1.8",
              fontSize: "1.125rem"
            }
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "mt-12 bg-gradient-to-br from-blue-600 to-blue-800 text-white rounded-2xl p-8 text-center", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-2xl font-bold mb-4", children: "Besoin d'un transport ?" }),
        /* @__PURE__ */ jsx("p", { className: "text-blue-100 mb-6", children: "Réservez votre taxi ou VSL conventionné en quelques clics" }),
        /* @__PURE__ */ jsx(
          "button",
          {
            onClick: () => navigate("/reservation-taxi-vsl/"),
            className: "bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition",
            children: "Réserver maintenant"
          }
        )
      ] })
    ] }) })
  ] });
}
function Contact() {
  const [formData, setFormData] = useState({
    nom: "",
    email: "",
    telephone: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [error, setError] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");
    try {
      const { error: insertError } = await supabase.from("contacts").insert([{
        nom: formData.nom,
        email: formData.email,
        telephone: formData.telephone,
        message: formData.message
      }]);
      if (insertError) throw insertError;
      const supabaseUrl2 = "https://qwsgtmzpirrbnmcbdvue.supabase.co";
      const supabaseAnonKey2 = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF3c2d0bXpwaXJyYm5tY2JkdnVlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODAyNDUzMjQsImV4cCI6MjA5NTgyMTMyNH0.RFb45xZjY3pDV4QWgr9-ASta84bX09fIcbv7ZZlY_mk";
      try {
        const emailResponse = await fetch(`${supabaseUrl2}/functions/v1/send-contact-email`, {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${supabaseAnonKey2}`,
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            nom: formData.nom,
            email: formData.email,
            telephone: formData.telephone,
            message: formData.message
          })
        });
        if (!emailResponse.ok) {
          console.error("Email sending failed, but contact saved");
        }
      } catch (emailError) {
        console.error("Error sending email:", emailError);
      }
      setSubmitSuccess(true);
      setFormData({
        nom: "",
        email: "",
        telephone: "",
        message: ""
      });
      setTimeout(() => setSubmitSuccess(false), 5e3);
    } catch (err) {
      console.error("Error submitting contact:", err);
      setError(err.message || "Une erreur est survenue. Veuillez réessayer.");
    } finally {
      setIsSubmitting(false);
    }
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };
  const jsonLD = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "name": "Contact - Taxi VSL Conventionné",
    "description": "Contactez notre équipe de taxi conventionné disponible 24/7 pour toutes vos questions.",
    "url": "https://www.taxisparis-conventionnes.fr/contact"
  };
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(
      SEOHead,
      {
        title: "Contact - Taxi VSL Conventionné Paris | 06 50 36 64 91",
        description: "Contactez notre service de taxi conventionné et VSL en Île-de-France. Disponible 24h/24, 7j/7. Téléphone: 06 50 36 64 91. Email: contact@taxisparis-conventionnes.fr",
        keywords: ["contact taxi conventionné", "téléphone taxi VSL", "contact transport médical", "taxi conventionné Paris contact"],
        canonical: "https://www.taxisparis-conventionnes.fr/contact",
        jsonLD
      }
    ),
    /* @__PURE__ */ jsx("div", { className: "py-12 bg-gray-50", children: /* @__PURE__ */ jsx("div", { className: "container mx-auto px-4", children: /* @__PURE__ */ jsxs("div", { className: "max-w-4xl mx-auto", children: [
      /* @__PURE__ */ jsxs("div", { className: "text-center mb-8", children: [
        /* @__PURE__ */ jsx("h1", { id: "page-title", className: "text-4xl font-bold text-gray-800 mb-4", children: "Contactez-nous" }),
        /* @__PURE__ */ jsx("p", { className: "text-xl text-gray-600", children: "Notre équipe est à votre écoute pour toute question" })
      ] }),
      submitSuccess && /* @__PURE__ */ jsxs("div", { role: "alert", "aria-live": "polite", className: "mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center gap-3", children: [
        /* @__PURE__ */ jsx(CheckCircle, { className: "text-green-600", size: 24, "aria-hidden": "true" }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("p", { className: "font-semibold text-green-800", children: "Votre message a été envoyé avec succès." }),
          /* @__PURE__ */ jsx("p", { className: "text-green-700", children: "Nous vous répondrons dans les plus brefs délais." })
        ] })
      ] }),
      error && /* @__PURE__ */ jsx("div", { className: "mb-6 p-4 bg-red-50 border border-red-200 rounded-lg", children: /* @__PURE__ */ jsx("p", { className: "text-red-800", children: error }) }),
      /* @__PURE__ */ jsxs("div", { className: "grid md:grid-cols-2 gap-8 mb-12", children: [
        /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-lg shadow-lg p-8", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-2xl font-bold text-gray-800 mb-6", children: "Informations de contact" }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-3", children: [
              /* @__PURE__ */ jsx(Phone, { className: "text-blue-600 mt-1", size: 24 }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("h3", { className: "font-semibold text-gray-800 mb-1", children: "Téléphone" }),
                /* @__PURE__ */ jsx("a", { href: "tel:+33650366491", className: "text-blue-600 hover:underline", children: "06 50 36 64 91" }),
                /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-600", children: "Disponible 24h/24" })
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-3", children: [
              /* @__PURE__ */ jsx(Mail, { className: "text-blue-600 mt-1", size: 24 }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("h3", { className: "font-semibold text-gray-800 mb-1", children: "Email" }),
                /* @__PURE__ */ jsx("a", { href: "mailto:contact@taxisparis-conventionnes.fr", className: "text-blue-600 hover:underline", children: "contact@taxisparis-conventionnes.fr" }),
                /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-600", children: "Réponse sous 24h" })
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-3", children: [
              /* @__PURE__ */ jsx(MapPin, { className: "text-blue-600 mt-1", size: 24 }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("h3", { className: "font-semibold text-gray-800 mb-1", children: "Localisation" }),
                /* @__PURE__ */ jsx("p", { className: "text-gray-700", children: "Paris, Île-de-France" }),
                /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-600", children: "Couvre toute la région" })
              ] })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("form", { onSubmit: handleSubmit, className: "bg-white rounded-lg shadow-lg p-8", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-2xl font-bold text-gray-800 mb-6", children: "Envoyez-nous un message" }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700 mb-2", children: "Nom *" }),
              /* @__PURE__ */ jsx(
                "input",
                {
                  type: "text",
                  name: "nom",
                  value: formData.nom,
                  onChange: handleChange,
                  required: true,
                  className: "w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                }
              )
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700 mb-2", children: "Email *" }),
              /* @__PURE__ */ jsx(
                "input",
                {
                  type: "email",
                  name: "email",
                  value: formData.email,
                  onChange: handleChange,
                  required: true,
                  className: "w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                }
              )
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700 mb-2", children: "Téléphone *" }),
              /* @__PURE__ */ jsx(
                "input",
                {
                  type: "tel",
                  name: "telephone",
                  value: formData.telephone,
                  onChange: handleChange,
                  required: true,
                  className: "w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                }
              )
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700 mb-2", children: "Message *" }),
              /* @__PURE__ */ jsx(
                "textarea",
                {
                  name: "message",
                  value: formData.message,
                  onChange: handleChange,
                  required: true,
                  rows: 5,
                  className: "w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                }
              )
            ] }),
            /* @__PURE__ */ jsxs(
              "button",
              {
                type: "submit",
                disabled: isSubmitting,
                className: "w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition disabled:bg-gray-400 disabled:cursor-not-allowed inline-flex items-center justify-center gap-2",
                children: [
                  /* @__PURE__ */ jsx(Send, { size: 20 }),
                  isSubmitting ? "Envoi en cours..." : "Envoyer le message"
                ]
              }
            )
          ] })
        ] })
      ] })
    ] }) }) })
  ] });
}
const departments = [
  {
    code: "75",
    name: "Paris",
    slug: "taxi-conventionne-paris-75",
    metaTitle: "Taxi conventionné & VSL Paris (75) | VSL et transport médical",
    metaDescription: "Taxi conventionné & VSL à Paris (75). Transport médical assis vers hôpitaux et cliniques, tiers-payant selon éligibilité. Réservation 7j/7.",
    h1: "Taxi conventionné & VSL à Paris (75)",
    content: "<p>Notre service de taxi conventionné & VSL intervient dans tout Paris (75) et ses 20 arrondissements. Nous assurons vos déplacements de santé en transport assis professionnalisé (TAP) : consultations, examens (IRM, scanner), hospitalisations et soins réguliers.</p><p>Selon votre situation et sur prescription médicale de transport, vous pouvez bénéficier du tiers-payant (aucune avance de frais) pour vos trajets vers les hôpitaux et cliniques de Paris et d’Île-de-France. Réservation simple par téléphone ou en ligne.</p>",
    cities: [
      {
        name: "Paris 1er",
        postalCode: "75001",
        slug: "paris-1er",
        localText: "Taxi conventionné et VSL à Paris 1er (75001) pour vos déplacements médicaux prescrits au cœur de la capitale. Notre service assure le transport sanitaire assis vers les hôpitaux, cliniques et centres spécialisés de Paris et d’Île-de-France. Depuis le 1er arrondissement, nous prenons en charge les consultations médicales, examens (IRM, scanner), hospitalisations, soins réguliers et sorties d’hôpital. Sur prescription médicale de transport, vous pouvez bénéficier du tiers-payant par l’Assurance Maladie selon votre situation (ALD, maternité, accident du travail). Nos chauffeurs expérimentés interviennent à Paris 1er avec ponctualité, discrétion et accompagnement personnalisé, 7 jours sur 7.",
        nearHospitals: [
          "Pitié-Salpêtrière",
          "Hôtel-Dieu",
          "Hôpital Saint-Louis",
          "Hôpital Cochin"
        ],
        nearStations: [
          "Gare de Lyon",
          "Gare du Nord"
        ],
        nearAirports: [
          "Aéroport d'Orly",
          "Aéroport Charles de Gaulle"
        ],
        nearCities: [
          "paris-17eme",
          "paris-15eme",
          "paris-14eme",
          "paris-8eme"
        ]
      },
      {
        name: "Paris 2ème",
        postalCode: "75002",
        slug: "paris-2eme",
        localText: "Taxi conventionné et VSL à Paris 2ème (75002) pour vos trajets médicaux prescrits dans le centre de Paris. Nous assurons le transport sanitaire assis vers les hôpitaux et cliniques parisiens ainsi que vers les établissements de santé d’Île-de-France. Depuis Paris 2e, nous prenons en charge consultations, examens médicaux, hospitalisations et soins réguliers. Sur prescription médicale, la prise en charge CPAM avec tiers-payant est possible selon votre situation.",
        nearHospitals: [
          "Pitié-Salpêtrière",
          "Hôtel-Dieu",
          "Hôpital Saint-Louis",
          "Hôpital Cochin"
        ],
        nearStations: [
          "Gare de Lyon"
        ],
        nearAirports: [
          "Aéroport d'Orly",
          "Aéroport Charles de Gaulle"
        ],
        nearCities: [
          "paris-9eme",
          "paris-6eme",
          "paris-13eme",
          "paris-11eme"
        ]
      },
      {
        name: "Paris 3ème",
        postalCode: "75003",
        slug: "paris-3eme",
        localText: "Taxi conventionné et VSL à Paris 3ème (75003) pour vos déplacements médicaux vers les hôpitaux et cliniques de Paris et de la région Île-de-France. Depuis le 3e arrondissement, nous organisons vos trajets médicaux prescrits : consultations, examens (IRM, scanner), hospitalisations et soins réguliers. Sur prescription médicale de transport, vous pouvez bénéficier du tiers-payant par l’Assurance Maladie.",
        nearHospitals: [
          "Pitié-Salpêtrière",
          "Hôtel-Dieu",
          "Hôpital Saint-Louis",
          "Hôpital Cochin"
        ],
        nearStations: [
          "Gare de Lyon",
          "Gare du Nord",
          "Gare Saint-Lazare"
        ],
        nearAirports: [
          "Aéroport d'Orly",
          "Aéroport Charles de Gaulle"
        ],
        nearCities: [
          "paris-18eme",
          "paris-1er",
          "paris-2eme"
        ]
      },
      {
        name: "Paris 4ème",
        postalCode: "75004",
        slug: "paris-4eme",
        localText: "Taxi conventionné et VSL à Paris 4ème (75004) pour vos trajets médicaux prescrits vers les établissements de santé parisiens et franciliens. Nous assurons le transport sanitaire assis pour les consultations médicales, examens, hospitalisations et soins réguliers. Depuis Paris 4e, la prise en charge CPAM avec tiers-payant est possible selon prescription médicale.",
        nearHospitals: [
          "Pitié-Salpêtrière",
          "Hôtel-Dieu",
          "Hôpital Saint-Louis",
          "Hôpital Cochin"
        ],
        nearStations: [
          "Gare de Lyon"
        ],
        nearAirports: [
          "Aéroport d'Orly",
          "Aéroport Charles de Gaulle"
        ],
        nearCities: [
          "paris-14eme",
          "paris-12eme",
          "paris-9eme"
        ]
      },
      {
        name: "Paris 5ème",
        postalCode: "75005",
        slug: "paris-5eme",
        localText: "Taxi conventionné et VSL à Paris 5ème (75005) pour vos déplacements médicaux prescrits vers les hôpitaux et cliniques de Paris et d’Île-de-France. Depuis le 5e arrondissement, nous prenons en charge consultations, examens médicaux, hospitalisations et soins réguliers. Sur prescription médicale, vous pouvez bénéficier du tiers-payant par l’Assurance Maladie.",
        nearHospitals: [
          "Pitié-Salpêtrière",
          "Hôtel-Dieu"
        ],
        nearStations: [
          "Gare de Lyon"
        ],
        nearAirports: [
          "Aéroport d'Orly",
          "Aéroport Charles de Gaulle"
        ],
        nearCities: [
          "paris-19eme",
          "paris-18eme",
          "paris-14eme",
          "paris-15eme"
        ]
      },
      {
        name: "Paris 6ème",
        postalCode: "75006",
        slug: "paris-6eme",
        localText: "Taxi conventionné et VSL à Paris 6ème (75006) pour vos trajets médicaux prescrits vers les centres hospitaliers et cliniques parisiens. Nous assurons le transport sanitaire assis pour les consultations, examens médicaux, hospitalisations et soins réguliers. Depuis Paris 6e, la prise en charge CPAM avec tiers-payant est possible selon prescription médicale.",
        nearHospitals: [
          "Pitié-Salpêtrière",
          "Hôtel-Dieu",
          "Hôpital Saint-Louis"
        ],
        nearStations: [
          "Gare de Lyon",
          "Gare du Nord"
        ],
        nearAirports: [
          "Aéroport d'Orly",
          "Aéroport Charles de Gaulle"
        ],
        nearCities: [
          "paris-9eme",
          "paris-16eme",
          "paris-2eme",
          "paris-19eme",
          "paris-11eme"
        ]
      },
      {
        name: "Paris 7ème",
        postalCode: "75007",
        slug: "paris-7eme",
        localText: "Taxi conventionné et VSL à Paris 7ème (75007) pour vos déplacements médicaux prescrits vers les établissements de santé de Paris et de l’Île-de-France. Nous prenons en charge consultations médicales, examens, hospitalisations et soins réguliers. Sur prescription médicale de transport, vous pouvez bénéficier du tiers-payant par l’Assurance Maladie.",
        nearHospitals: [
          "Pitié-Salpêtrière",
          "Hôtel-Dieu",
          "Hôpital Saint-Louis"
        ],
        nearStations: [
          "Gare de Lyon",
          "Gare du Nord",
          "Gare Saint-Lazare"
        ],
        nearAirports: [
          "Aéroport d'Orly",
          "Aéroport Charles de Gaulle"
        ],
        nearCities: [
          "paris-6eme",
          "paris-15eme",
          "paris-1er"
        ]
      },
      {
        name: "Paris 8ème",
        postalCode: "75008",
        slug: "paris-8eme",
        localText: "Taxi conventionné et VSL à Paris 8ème (75008) pour vos trajets médicaux prescrits vers les hôpitaux et cliniques parisiens. Depuis le 8e arrondissement, nous assurons le transport sanitaire assis pour consultations, examens médicaux, hospitalisations et soins réguliers.",
        nearHospitals: [
          "Hôpital Georges Pompidou",
          "Hôpital Necker",
          "Institut Curie"
        ],
        nearStations: [
          "Gare Saint-Lazare",
          "Gare Montparnasse"
        ],
        nearAirports: [
          "Aéroport d'Orly"
        ],
        nearCities: [
          "paris-14eme",
          "paris-7eme",
          "paris-19eme"
        ]
      },
      {
        name: "Paris 9ème",
        postalCode: "75009",
        slug: "paris-9eme",
        localText: "Taxi conventionné et VSL à Paris 9ème (75009) pour vos déplacements médicaux prescrits vers les établissements de santé de Paris et d’Île-de-France. Nous assurons les consultations médicales, examens, hospitalisations et soins réguliers. Sur prescription médicale, vous pouvez bénéficier du tiers-payant par l’Assurance Maladie.",
        nearHospitals: [
          "Hôpital Georges Pompidou",
          "Hôpital Necker",
          "Institut Curie",
          "Hôpital Foch"
        ],
        nearStations: [
          "Gare Saint-Lazare"
        ],
        nearAirports: [
          "Aéroport d'Orly"
        ],
        nearCities: [
          "paris-7eme",
          "paris-20eme",
          "paris-14eme",
          "paris-18eme"
        ]
      },
      {
        name: "Paris 10ème",
        postalCode: "75010",
        slug: "paris-10eme",
        localText: "Taxi conventionné et VSL à Paris 10ème (75010) pour vos trajets médicaux prescrits vers les hôpitaux et cliniques parisiens. Nous prenons en charge consultations, examens médicaux, hospitalisations et soins réguliers.",
        nearHospitals: [
          "Hôpital Bichat",
          "Hôpital Lariboisière"
        ],
        nearStations: [
          "Gare du Nord",
          "Gare de l'Est"
        ],
        nearAirports: [
          "Aéroport Charles de Gaulle",
          "Aéroport du Bourget"
        ],
        nearCities: [
          "paris-15eme",
          "paris-7eme",
          "paris-11eme"
        ]
      },
      {
        name: "Paris 11ème",
        postalCode: "75011",
        slug: "paris-11eme",
        localText: "Taxi conventionné et VSL à Paris 11ème (75011) pour vos déplacements médicaux prescrits vers les hôpitaux et cliniques de Paris et d’Île-de-France. Nous assurons le transport sanitaire assis pour consultations, examens médicaux, hospitalisations et soins réguliers.",
        nearHospitals: [
          "Hôpital Tenon",
          "Hôpital Saint-Antoine",
          "Hôpital Trousseau"
        ],
        nearStations: [
          "Gare de Lyon",
          "Gare de l'Est"
        ],
        nearAirports: [
          "Aéroport Charles de Gaulle"
        ],
        nearCities: [
          "paris-4eme",
          "paris-20eme",
          "paris-9eme",
          "paris-7eme"
        ]
      },
      {
        name: "Paris 12ème",
        postalCode: "75012",
        slug: "paris-12eme",
        localText: "Taxi conventionné et VSL à Paris 12ème (75012) pour vos trajets médicaux prescrits vers les établissements de santé parisiens et franciliens. Nous prenons en charge consultations, examens médicaux, hospitalisations et soins réguliers.",
        nearHospitals: [
          "Hôpital Tenon",
          "Hôpital Saint-Antoine",
          "Hôpital Trousseau"
        ],
        nearStations: [
          "Gare de Lyon"
        ],
        nearAirports: [
          "Aéroport Charles de Gaulle"
        ],
        nearCities: [
          "paris-11eme",
          "paris-13eme",
          "paris-1er",
          "paris-7eme",
          "paris-5eme"
        ]
      },
      {
        name: "Paris 13ème",
        postalCode: "75013",
        slug: "paris-13eme",
        localText: "Taxi conventionné et VSL à Paris 13ème (75013) pour vos déplacements médicaux prescrits vers les hôpitaux et centres spécialisés de Paris et d’Île-de-France. Nous organisons les trajets pour consultations, examens médicaux, hospitalisations et soins réguliers.",
        nearHospitals: [
          "Hôpital Cochin",
          "Institut Gustave Roussy"
        ],
        nearStations: [
          "Gare Montparnasse"
        ],
        nearAirports: [
          "Aéroport d'Orly"
        ],
        nearCities: [
          "paris-16eme",
          "paris-5eme",
          "paris-3eme"
        ]
      },
      {
        name: "Paris 14ème",
        postalCode: "75014",
        slug: "paris-14eme",
        localText: "Taxi conventionné et VSL à Paris 14ème (75014) pour vos trajets médicaux prescrits vers les établissements de santé parisiens et d’Île-de-France. Nous assurons le transport sanitaire assis pour consultations, examens médicaux et hospitalisations.",
        nearHospitals: [
          "Hôpital Cochin",
          "Institut Gustave Roussy",
          "Hôpital Bicêtre",
          "Hôpital Paul Brousse"
        ],
        nearStations: [
          "Gare Montparnasse",
          "Gare d'Austerlitz"
        ],
        nearAirports: [
          "Aéroport d'Orly"
        ],
        nearCities: [
          "paris-15eme",
          "paris-7eme",
          "paris-10eme"
        ]
      },
      {
        name: "Paris 15ème",
        postalCode: "75015",
        slug: "paris-15eme",
        localText: "Taxi conventionné et VSL à Paris 15ème (75015) pour vos déplacements médicaux prescrits vers les hôpitaux, cliniques et centres de soins de Paris et d’Île-de-France. Nous prenons en charge consultations médicales, examens et soins réguliers.",
        nearHospitals: [
          "Hôpital Cochin",
          "Institut Gustave Roussy",
          "Hôpital Bicêtre",
          "Hôpital Paul Brousse"
        ],
        nearStations: [
          "Gare Montparnasse"
        ],
        nearAirports: [
          "Aéroport d'Orly"
        ],
        nearCities: [
          "paris-4eme",
          "paris-20eme",
          "paris-11eme",
          "paris-3eme",
          "paris-6eme"
        ]
      },
      {
        name: "Paris 16ème",
        postalCode: "75016",
        slug: "paris-16eme",
        localText: "Taxi conventionné et VSL à Paris 16ème (75016) pour vos trajets médicaux prescrits vers les établissements de santé parisiens et franciliens. Nous assurons le transport sanitaire assis pour consultations, examens médicaux et hospitalisations.",
        nearHospitals: [
          "Hôpital Georges Pompidou",
          "Hôpital Necker",
          "Institut Curie"
        ],
        nearStations: [
          "Gare Saint-Lazare",
          "Gare Montparnasse"
        ],
        nearAirports: [
          "Aéroport d'Orly"
        ],
        nearCities: [
          "paris-19eme",
          "paris-10eme",
          "paris-18eme",
          "paris-5eme"
        ]
      },
      {
        name: "Paris 17ème",
        postalCode: "75017",
        slug: "paris-17eme",
        localText: "Taxi conventionné et VSL à Paris 17ème (75017) pour vos déplacements médicaux prescrits vers les hôpitaux et cliniques de Paris et d’Île-de-France. Nous prenons en charge consultations médicales, examens et soins réguliers.",
        nearHospitals: [
          "Hôpital Georges Pompidou",
          "Hôpital Necker"
        ],
        nearStations: [
          "Gare Saint-Lazare",
          "Gare Montparnasse"
        ],
        nearAirports: [
          "Aéroport d'Orly"
        ],
        nearCities: [
          "paris-1er",
          "paris-4eme",
          "paris-19eme"
        ]
      },
      {
        name: "Paris 18ème",
        postalCode: "75018",
        slug: "paris-18eme",
        localText: "Taxi conventionné et VSL à Paris 18ème (75018) pour vos trajets médicaux prescrits vers les établissements de santé de Paris et d’Île-de-France. Nous assurons le transport sanitaire assis pour consultations, examens médicaux et sorties d’hôpital.",
        nearHospitals: [
          "Hôpital Bichat",
          "Hôpital Lariboisière"
        ],
        nearStations: [
          "Gare du Nord",
          "Gare de l'Est"
        ],
        nearAirports: [
          "Aéroport Charles de Gaulle",
          "Aéroport du Bourget"
        ],
        nearCities: [
          "paris-4eme",
          "paris-3eme",
          "paris-15eme",
          "paris-17eme",
          "paris-11eme"
        ]
      },
      {
        name: "Paris 19ème",
        postalCode: "75019",
        slug: "paris-19eme",
        localText: "Taxi conventionné et VSL à Paris 19ème (75019) pour vos déplacements médicaux prescrits vers les hôpitaux et cliniques parisiens. Nous assurons le transport sanitaire assis pour consultations médicales, examens et soins réguliers.",
        nearHospitals: [
          "Hôpital Bichat",
          "Hôpital Lariboisière",
          "Hôpital Saint-Louis"
        ],
        nearStations: [
          "Gare du Nord",
          "Gare de l'Est"
        ],
        nearAirports: [
          "Aéroport Charles de Gaulle",
          "Aéroport du Bourget"
        ],
        nearCities: [
          "paris-14eme",
          "paris-1er",
          "paris-4eme",
          "paris-17eme",
          "paris-13eme"
        ]
      },
      {
        name: "Paris 20ème",
        postalCode: "75020",
        slug: "paris-20eme",
        localText: "Taxi conventionné et VSL à Paris 20ème (75020) pour vos trajets médicaux prescrits vers les établissements de santé de Paris et d’Île-de-France. Nous prenons en charge consultations médicales, examens et hospitalisations.",
        nearHospitals: [
          "Hôpital Tenon",
          "Hôpital Saint-Antoine"
        ],
        nearStations: [
          "Gare de Lyon",
          "Gare de l'Est"
        ],
        nearAirports: [
          "Aéroport Charles de Gaulle"
        ],
        nearCities: [
          "paris-3eme",
          "paris-2eme",
          "paris-19eme"
        ]
      }
    ]
  },
  {
    code: "91",
    name: "Essonne",
    slug: "taxi-conventionne-essonne-91",
    metaTitle: "Taxi conventionné & VSL Essonne (91) | VSL et transport médical",
    metaDescription: "Taxi conventionné & VSL en Essonne (91). Transport médical assis vers hôpitaux et cliniques, tiers-payant selon prescription. Réservation 7j/7.",
    h1: "Taxi conventionné & VSL en Essonne (91)",
    content: "<p>Notre service de taxi conventionné & VSL dessert l’ensemble de l’Essonne (91). Nous assurons vos trajets médicaux en transport assis : consultations, examens, hospitalisations, rééducation et soins réguliers.</p><p>Sur prescription médicale de transport et selon votre situation (ALD, accident du travail, maternité, etc.), vous pouvez bénéficier du tiers-payant.</p>",
    cities: [
      {
        name: "Évry-Courcouronnes",
        postalCode: "91000",
        slug: "evry-courcouronnes",
        localText: "Taxi conventionné et VSL à Évry-Courcouronnes (91000) pour vos déplacements médicaux prescrits vers les hôpitaux et cliniques de l'Essonne et d'Île-de-France.",
        nearHospitals: [
          "Hôpital Cochin",
          "Institut Gustave Roussy",
          "Hôpital Bicêtre",
          "Hôpital Paul Brousse"
        ],
        nearStations: [
          "Gare Montparnasse",
          "Gare d'Austerlitz"
        ],
        nearAirports: [
          "Aéroport d'Orly"
        ],
        nearCities: [
          "palaiseau",
          "mennecy",
          "savigny-sur-orge"
        ]
      },
      {
        name: "Corbeil-Essonnes",
        postalCode: "91100",
        slug: "corbeil-essonnes",
        localText: "Taxi conventionné et VSL à Corbeil-Essonnes (91100) pour vos déplacements médicaux prescrits vers les hôpitaux et cliniques de l'Essonne et d'Île-de-France.",
        nearHospitals: [
          "Hôpital Cochin",
          "Institut Gustave Roussy",
          "Hôpital Bicêtre"
        ],
        nearStations: [
          "Gare Montparnasse",
          "Gare d'Austerlitz"
        ],
        nearAirports: [
          "Aéroport d'Orly"
        ],
        nearCities: [
          "paray-vieille-poste",
          "quincy-sous-senart",
          "longjumeau"
        ]
      },
      {
        name: "Massy",
        postalCode: "91300",
        slug: "massy",
        localText: "Taxi conventionné et VSL à Massy (91300) pour vos déplacements médicaux prescrits vers les hôpitaux et cliniques de l'Essonne et d'Île-de-France.",
        nearHospitals: [
          "Hôpital Cochin",
          "Institut Gustave Roussy",
          "Hôpital Bicêtre",
          "Hôpital Paul Brousse"
        ],
        nearStations: [
          "Gare Montparnasse",
          "Gare d'Austerlitz"
        ],
        nearAirports: [
          "Aéroport d'Orly"
        ],
        nearCities: [
          "montgeron",
          "evry-courcouronnes",
          "soisy-sur-seine"
        ]
      },
      {
        name: "Savigny-sur-Orge",
        postalCode: "91600",
        slug: "savigny-sur-orge",
        localText: "Taxi conventionné et VSL à Savigny-sur-Orge (91600) pour vos déplacements médicaux prescrits vers les hôpitaux et cliniques de l'Essonne et d'Île-de-France.",
        nearHospitals: [
          "Hôpital Cochin",
          "Institut Gustave Roussy"
        ],
        nearStations: [
          "Gare Montparnasse"
        ],
        nearAirports: [
          "Aéroport d'Orly"
        ],
        nearCities: [
          "evry-courcouronnes",
          "verrieres-le-buisson",
          "viry-chatillon"
        ]
      },
      {
        name: "Sainte-Geneviève-des-Bois",
        postalCode: "91700",
        slug: "sainte-genevieve-des-bois",
        localText: "Taxi conventionné et VSL à Sainte-Geneviève-des-Bois (91700) pour vos déplacements médicaux prescrits vers les hôpitaux et cliniques de l'Essonne et d'Île-de-France.",
        nearHospitals: [
          "Hôpital Cochin",
          "Institut Gustave Roussy"
        ],
        nearStations: [
          "Gare Montparnasse",
          "Gare d'Austerlitz"
        ],
        nearAirports: [
          "Aéroport d'Orly"
        ],
        nearCities: [
          "orsay",
          "ris-orangis",
          "chilly-mazarin",
          "soisy-sur-seine",
          "savigny-sur-orge"
        ]
      },
      {
        name: "Brunoy",
        postalCode: "91800",
        slug: "brunoy",
        localText: "Taxi conventionné et VSL à Brunoy (91800) pour vos déplacements médicaux prescrits vers les hôpitaux et cliniques de l'Essonne et d'Île-de-France.",
        nearHospitals: [
          "Hôpital Cochin",
          "Institut Gustave Roussy",
          "Hôpital Bicêtre",
          "Hôpital Paul Brousse"
        ],
        nearStations: [
          "Gare Montparnasse"
        ],
        nearAirports: [
          "Aéroport d'Orly"
        ],
        nearCities: [
          "yerres",
          "evry-courcouronnes",
          "verrieres-le-buisson"
        ]
      },
      {
        name: "Draveil",
        postalCode: "91210",
        slug: "draveil",
        localText: "Taxi conventionné et VSL à Draveil (91210) pour vos déplacements médicaux prescrits vers les hôpitaux et cliniques de l'Essonne et d'Île-de-France.",
        nearHospitals: [
          "Hôpital Cochin",
          "Institut Gustave Roussy",
          "Hôpital Bicêtre",
          "Hôpital Paul Brousse"
        ],
        nearStations: [
          "Gare Montparnasse"
        ],
        nearAirports: [
          "Aéroport d'Orly"
        ],
        nearCities: [
          "viry-chatillon",
          "ris-orangis",
          "champlan",
          "etampes"
        ]
      },
      {
        name: "Viry-Châtillon",
        postalCode: "91170",
        slug: "viry-chatillon",
        localText: "Taxi conventionné et VSL à Viry-Châtillon (91170) pour vos déplacements médicaux prescrits vers les hôpitaux et cliniques de l'Essonne et d'Île-de-France.",
        nearHospitals: [
          "Hôpital Cochin",
          "Institut Gustave Roussy",
          "Hôpital Bicêtre"
        ],
        nearStations: [
          "Gare Montparnasse",
          "Gare d'Austerlitz"
        ],
        nearAirports: [
          "Aéroport d'Orly"
        ],
        nearCities: [
          "bondoufle",
          "brunoy",
          "bures-sur-yvette"
        ]
      },
      {
        name: "Athis-Mons",
        postalCode: "91200",
        slug: "athis-mons",
        localText: "Taxi conventionné et VSL à Athis-Mons (91200) pour vos déplacements médicaux prescrits vers les hôpitaux et cliniques de l'Essonne et d'Île-de-France.",
        nearHospitals: [
          "Hôpital Cochin",
          "Institut Gustave Roussy",
          "Hôpital Bicêtre"
        ],
        nearStations: [
          "Gare Montparnasse"
        ],
        nearAirports: [
          "Aéroport d'Orly"
        ],
        nearCities: [
          "palaiseau",
          "evry-courcouronnes",
          "corbeil-essonnes",
          "boussy-saint-antoine",
          "morsang-sur-orge"
        ]
      },
      {
        name: "Juvisy-sur-Orge",
        postalCode: "91260",
        slug: "juvisy-sur-orge",
        localText: "Taxi conventionné et VSL à Juvisy-sur-Orge (91260) pour vos déplacements médicaux prescrits vers les hôpitaux et cliniques de l'Essonne et d'Île-de-France.",
        nearHospitals: [
          "Hôpital Cochin",
          "Institut Gustave Roussy",
          "Hôpital Bicêtre",
          "Hôpital Paul Brousse"
        ],
        nearStations: [
          "Gare Montparnasse",
          "Gare d'Austerlitz"
        ],
        nearAirports: [
          "Aéroport d'Orly"
        ],
        nearCities: [
          "quincy-sous-senart",
          "les-ulis",
          "soisy-sur-seine",
          "dourdan",
          "evry-courcouronnes"
        ]
      },
      {
        name: "Yerres",
        postalCode: "91330",
        slug: "yerres",
        localText: "Taxi conventionné et VSL à Yerres (91330) pour vos déplacements médicaux prescrits vers les hôpitaux et cliniques de l'Essonne et d'Île-de-France.",
        nearHospitals: [
          "Hôpital Cochin",
          "Institut Gustave Roussy",
          "Hôpital Bicêtre"
        ],
        nearStations: [
          "Gare Montparnasse",
          "Gare d'Austerlitz"
        ],
        nearAirports: [
          "Aéroport d'Orly"
        ],
        nearCities: [
          "bures-sur-yvette",
          "dourdan",
          "evry-courcouronnes",
          "corbeil-essonnes"
        ]
      },
      {
        name: "Palaiseau",
        postalCode: "91120",
        slug: "palaiseau",
        localText: "Taxi conventionné et VSL à Palaiseau (91120) pour vos déplacements médicaux prescrits vers les hôpitaux et cliniques de l'Essonne et d'Île-de-France.",
        nearHospitals: [
          "Hôpital Cochin",
          "Institut Gustave Roussy",
          "Hôpital Bicêtre"
        ],
        nearStations: [
          "Gare Montparnasse",
          "Gare d'Austerlitz"
        ],
        nearAirports: [
          "Aéroport d'Orly"
        ],
        nearCities: [
          "vigneux-sur-seine",
          "quincy-sous-senart",
          "villemoisson-sur-orge",
          "limours",
          "epinay-sous-senart"
        ]
      },
      {
        name: "Chilly-Mazarin",
        postalCode: "91380",
        slug: "chilly-mazarin",
        localText: "Taxi conventionné et VSL à Chilly-Mazarin (91380) pour vos déplacements médicaux prescrits vers les hôpitaux et cliniques de l'Essonne et d'Île-de-France.",
        nearHospitals: [
          "Hôpital Cochin",
          "Institut Gustave Roussy"
        ],
        nearStations: [
          "Gare Montparnasse",
          "Gare d'Austerlitz"
        ],
        nearAirports: [
          "Aéroport d'Orly"
        ],
        nearCities: [
          "morangis",
          "limours",
          "fleury-merogis",
          "ballainvilliers",
          "epinay-sous-senart"
        ]
      },
      {
        name: "Longjumeau",
        postalCode: "91160",
        slug: "longjumeau",
        localText: "Taxi conventionné et VSL à Longjumeau (91160) pour vos déplacements médicaux prescrits vers les hôpitaux et cliniques de l'Essonne et d'Île-de-France.",
        nearHospitals: [
          "Hôpital Cochin",
          "Institut Gustave Roussy"
        ],
        nearStations: [
          "Gare Montparnasse"
        ],
        nearAirports: [
          "Aéroport d'Orly"
        ],
        nearCities: [
          "yerres",
          "draveil",
          "palaiseau",
          "villebon-sur-yvette",
          "bures-sur-yvette"
        ]
      },
      {
        name: "Ris-Orangis",
        postalCode: "91130",
        slug: "ris-orangis",
        localText: "Taxi conventionné et VSL à Ris-Orangis (91130) pour vos déplacements médicaux prescrits vers les hôpitaux et cliniques de l'Essonne et d'Île-de-France.",
        nearHospitals: [
          "Hôpital Cochin",
          "Institut Gustave Roussy"
        ],
        nearStations: [
          "Gare Montparnasse",
          "Gare d'Austerlitz"
        ],
        nearAirports: [
          "Aéroport d'Orly"
        ],
        nearCities: [
          "paray-vieille-poste",
          "limours",
          "soisy-sur-seine",
          "quincy-sous-senart"
        ]
      },
      {
        name: "Étampes",
        postalCode: "91150",
        slug: "etampes",
        localText: "Taxi conventionné et VSL à Étampes (91150) pour vos déplacements médicaux prescrits vers les hôpitaux et cliniques de l'Essonne et d'Île-de-France.",
        nearHospitals: [
          "Hôpital Cochin",
          "Institut Gustave Roussy"
        ],
        nearStations: [
          "Gare Montparnasse",
          "Gare d'Austerlitz"
        ],
        nearAirports: [
          "Aéroport d'Orly"
        ],
        nearCities: [
          "montgeron",
          "evry-courcouronnes",
          "fleury-merogis",
          "morangis"
        ]
      },
      {
        name: "Grigny",
        postalCode: "91350",
        slug: "grigny",
        localText: "Taxi conventionné et VSL à Grigny (91350) pour vos déplacements médicaux prescrits vers les hôpitaux et cliniques de l'Essonne et d'Île-de-France.",
        nearHospitals: [
          "Hôpital Cochin",
          "Institut Gustave Roussy"
        ],
        nearStations: [
          "Gare Montparnasse"
        ],
        nearAirports: [
          "Aéroport d'Orly"
        ],
        nearCities: [
          "chilly-mazarin",
          "longjumeau",
          "montgeron"
        ]
      },
      {
        name: "Les Ulis",
        postalCode: "91940",
        slug: "les-ulis",
        localText: "Taxi conventionné et VSL à Les Ulis (91940) pour vos déplacements médicaux prescrits vers les hôpitaux et cliniques de l'Essonne et d'Île-de-France.",
        nearHospitals: [
          "Hôpital Cochin",
          "Institut Gustave Roussy"
        ],
        nearStations: [
          "Gare Montparnasse"
        ],
        nearAirports: [
          "Aéroport d'Orly"
        ],
        nearCities: [
          "arpajon",
          "montgeron",
          "linas",
          "quincy-sous-senart"
        ]
      },
      {
        name: "Montgeron",
        postalCode: "91230",
        slug: "montgeron",
        localText: "Taxi conventionné et VSL à Montgeron (91230) pour vos déplacements médicaux prescrits vers les hôpitaux et cliniques de l'Essonne et d'Île-de-France.",
        nearHospitals: [
          "Hôpital Cochin",
          "Institut Gustave Roussy",
          "Hôpital Bicêtre"
        ],
        nearStations: [
          "Gare Montparnasse",
          "Gare d'Austerlitz"
        ],
        nearAirports: [
          "Aéroport d'Orly"
        ],
        nearCities: [
          "orsay",
          "soisy-sur-seine",
          "lisses"
        ]
      },
      {
        name: "Orsay",
        postalCode: "91400",
        slug: "orsay",
        localText: "Taxi conventionné et VSL à Orsay (91400) pour vos déplacements médicaux prescrits vers les hôpitaux et cliniques de l'Essonne et d'Île-de-France.",
        nearHospitals: [
          "Hôpital Cochin",
          "Institut Gustave Roussy"
        ],
        nearStations: [
          "Gare Montparnasse",
          "Gare d'Austerlitz"
        ],
        nearAirports: [
          "Aéroport d'Orly"
        ],
        nearCities: [
          "soisy-sur-seine",
          "evry-courcouronnes",
          "quincy-sous-senart",
          "savigny-sur-orge"
        ]
      },
      {
        name: "Gif-sur-Yvette",
        postalCode: "91190",
        slug: "gif-sur-yvette",
        localText: "Taxi conventionné et VSL à Gif-sur-Yvette (91190) pour vos déplacements médicaux prescrits vers les hôpitaux et cliniques de l'Essonne et d'Île-de-France.",
        nearHospitals: [
          "Hôpital Cochin",
          "Institut Gustave Roussy"
        ],
        nearStations: [
          "Gare Montparnasse",
          "Gare d'Austerlitz"
        ],
        nearAirports: [
          "Aéroport d'Orly"
        ],
        nearCities: [
          "verrieres-le-buisson",
          "soisy-sur-seine",
          "massy",
          "bures-sur-yvette",
          "ris-orangis"
        ]
      },
      {
        name: "Villebon-sur-Yvette",
        postalCode: "91140",
        slug: "villebon-sur-yvette",
        localText: "Taxi conventionné et VSL à Villebon-sur-Yvette (91140) pour vos déplacements médicaux prescrits vers les hôpitaux et cliniques de l'Essonne et d'Île-de-France.",
        nearHospitals: [
          "Hôpital Cochin",
          "Institut Gustave Roussy"
        ],
        nearStations: [
          "Gare Montparnasse"
        ],
        nearAirports: [
          "Aéroport d'Orly"
        ],
        nearCities: [
          "palaiseau",
          "quincy-sous-senart",
          "villemoisson-sur-orge",
          "ris-orangis"
        ]
      },
      {
        name: "Brétigny-sur-Orge",
        postalCode: "91220",
        slug: "bretigny-sur-orge",
        localText: "Taxi conventionné et VSL à Brétigny-sur-Orge (91220) pour vos déplacements médicaux prescrits vers les hôpitaux et cliniques de l'Essonne et d'Île-de-France.",
        nearHospitals: [
          "Hôpital Cochin",
          "Institut Gustave Roussy",
          "Hôpital Bicêtre"
        ],
        nearStations: [
          "Gare Montparnasse",
          "Gare d'Austerlitz"
        ],
        nearAirports: [
          "Aéroport d'Orly"
        ],
        nearCities: [
          "lisses",
          "milly-la-foret",
          "linas",
          "sainte-genevieve-des-bois",
          "paray-vieille-poste"
        ]
      },
      {
        name: "Épinay-sous-Sénart",
        postalCode: "91860",
        slug: "epinay-sous-senart",
        localText: "Taxi conventionné et VSL à Épinay-sous-Sénart (91860) pour vos déplacements médicaux prescrits vers les hôpitaux et cliniques de l'Essonne et d'Île-de-France.",
        nearHospitals: [
          "Hôpital Cochin",
          "Institut Gustave Roussy"
        ],
        nearStations: [
          "Gare Montparnasse",
          "Gare d'Austerlitz"
        ],
        nearAirports: [
          "Aéroport d'Orly"
        ],
        nearCities: [
          "juvisy-sur-orge",
          "longjumeau",
          "bretigny-sur-orge",
          "wissous"
        ]
      },
      {
        name: "Fleury-Mérogis",
        postalCode: "91700",
        slug: "fleury-merogis",
        localText: "Taxi conventionné et VSL à Fleury-Mérogis (91700) pour vos déplacements médicaux prescrits vers les hôpitaux et cliniques de l'Essonne et d'Île-de-France.",
        nearHospitals: [
          "Hôpital Cochin",
          "Institut Gustave Roussy",
          "Hôpital Bicêtre"
        ],
        nearStations: [
          "Gare Montparnasse"
        ],
        nearAirports: [
          "Aéroport d'Orly"
        ],
        nearCities: [
          "athis-mons",
          "gif-sur-yvette",
          "champlan",
          "savigny-sur-orge"
        ]
      },
      {
        name: "Vigneux-sur-Seine",
        postalCode: "91270",
        slug: "vigneux-sur-seine",
        localText: "Taxi conventionné et VSL à Vigneux-sur-Seine (91270) pour vos déplacements médicaux prescrits vers les hôpitaux et cliniques de l'Essonne et d'Île-de-France.",
        nearHospitals: [
          "Hôpital Cochin",
          "Institut Gustave Roussy",
          "Hôpital Bicêtre"
        ],
        nearStations: [
          "Gare Montparnasse"
        ],
        nearAirports: [
          "Aéroport d'Orly"
        ],
        nearCities: [
          "viry-chatillon",
          "morsang-sur-orge",
          "longjumeau",
          "palaiseau"
        ]
      },
      {
        name: "Morsang-sur-Orge",
        postalCode: "91390",
        slug: "morsang-sur-orge",
        localText: "Taxi conventionné et VSL à Morsang-sur-Orge (91390) pour vos déplacements médicaux prescrits vers les hôpitaux et cliniques de l'Essonne et d'Île-de-France.",
        nearHospitals: [
          "Hôpital Cochin",
          "Institut Gustave Roussy"
        ],
        nearStations: [
          "Gare Montparnasse"
        ],
        nearAirports: [
          "Aéroport d'Orly"
        ],
        nearCities: [
          "grigny",
          "orsay",
          "les-ulis",
          "draveil",
          "dourdan"
        ]
      },
      {
        name: "Épinay-sur-Orge",
        postalCode: "91360",
        slug: "epinay-sur-orge",
        localText: "Taxi conventionné et VSL à Épinay-sur-Orge (91360) pour vos déplacements médicaux prescrits vers les hôpitaux et cliniques de l'Essonne et d'Île-de-France.",
        nearHospitals: [
          "Hôpital Cochin",
          "Institut Gustave Roussy",
          "Hôpital Bicêtre",
          "Hôpital Paul Brousse"
        ],
        nearStations: [
          "Gare Montparnasse"
        ],
        nearAirports: [
          "Aéroport d'Orly"
        ],
        nearCities: [
          "soisy-sur-seine",
          "villebon-sur-yvette",
          "gif-sur-yvette",
          "sainte-genevieve-des-bois",
          "dourdan"
        ]
      },
      {
        name: "Saint-Michel-sur-Orge",
        postalCode: "91240",
        slug: "saint-michel-sur-orge",
        localText: "Taxi conventionné et VSL à Saint-Michel-sur-Orge (91240) pour vos déplacements médicaux prescrits vers les hôpitaux et cliniques de l'Essonne et d'Île-de-France.",
        nearHospitals: [
          "Hôpital Cochin",
          "Institut Gustave Roussy",
          "Hôpital Bicêtre"
        ],
        nearStations: [
          "Gare Montparnasse",
          "Gare d'Austerlitz"
        ],
        nearAirports: [
          "Aéroport d'Orly"
        ],
        nearCities: [
          "quincy-sous-senart",
          "massy",
          "champlan",
          "morangis",
          "epinay-sur-orge"
        ]
      },
      {
        name: "Morangis",
        postalCode: "91420",
        slug: "morangis",
        localText: "Taxi conventionné et VSL à Morangis (91420) pour vos déplacements médicaux prescrits vers les hôpitaux et cliniques de l'Essonne et d'Île-de-France.",
        nearHospitals: [
          "Hôpital Cochin",
          "Institut Gustave Roussy",
          "Hôpital Bicêtre",
          "Hôpital Paul Brousse"
        ],
        nearStations: [
          "Gare Montparnasse",
          "Gare d'Austerlitz"
        ],
        nearAirports: [
          "Aéroport d'Orly"
        ],
        nearCities: [
          "grigny",
          "evry-courcouronnes",
          "villemoisson-sur-orge",
          "limours"
        ]
      },
      {
        name: "Mennecy",
        postalCode: "91540",
        slug: "mennecy",
        localText: "Taxi conventionné et VSL à Mennecy (91540) pour vos déplacements médicaux prescrits vers les hôpitaux et cliniques de l'Essonne et d'Île-de-France.",
        nearHospitals: [
          "Hôpital Cochin",
          "Institut Gustave Roussy",
          "Hôpital Bicêtre"
        ],
        nearStations: [
          "Gare Montparnasse",
          "Gare d'Austerlitz"
        ],
        nearAirports: [
          "Aéroport d'Orly"
        ],
        nearCities: [
          "palaiseau",
          "marcoussis",
          "paray-vieille-poste",
          "draveil"
        ]
      },
      {
        name: "Quincy-sous-Sénart",
        postalCode: "91480",
        slug: "quincy-sous-senart",
        localText: "Taxi conventionné et VSL à Quincy-sous-Sénart (91480) pour vos déplacements médicaux prescrits vers les hôpitaux et cliniques de l'Essonne et d'Île-de-France.",
        nearHospitals: [
          "Hôpital Cochin",
          "Institut Gustave Roussy",
          "Hôpital Bicêtre",
          "Hôpital Paul Brousse"
        ],
        nearStations: [
          "Gare Montparnasse",
          "Gare d'Austerlitz"
        ],
        nearAirports: [
          "Aéroport d'Orly"
        ],
        nearCities: [
          "mennecy",
          "saint-michel-sur-orge",
          "dourdan",
          "linas"
        ]
      },
      {
        name: "Crosne",
        postalCode: "91560",
        slug: "crosne",
        localText: "Taxi conventionné et VSL à Crosne (91560) pour vos déplacements médicaux prescrits vers les hôpitaux et cliniques de l'Essonne et d'Île-de-France.",
        nearHospitals: [
          "Hôpital Cochin",
          "Institut Gustave Roussy",
          "Hôpital Bicêtre"
        ],
        nearStations: [
          "Gare Montparnasse",
          "Gare d'Austerlitz"
        ],
        nearAirports: [
          "Aéroport d'Orly"
        ],
        nearCities: [
          "evry-courcouronnes",
          "montgeron",
          "orsay",
          "milly-la-foret"
        ]
      },
      {
        name: "Bondoufle",
        postalCode: "91070",
        slug: "bondoufle",
        localText: "Taxi conventionné et VSL à Bondoufle (91070) pour vos déplacements médicaux prescrits vers les hôpitaux et cliniques de l'Essonne et d'Île-de-France.",
        nearHospitals: [
          "Hôpital Cochin",
          "Institut Gustave Roussy",
          "Hôpital Bicêtre"
        ],
        nearStations: [
          "Gare Montparnasse"
        ],
        nearAirports: [
          "Aéroport d'Orly"
        ],
        nearCities: [
          "savigny-sur-orge",
          "evry-courcouronnes",
          "palaiseau"
        ]
      },
      {
        name: "Arpajon",
        postalCode: "91290",
        slug: "arpajon",
        localText: "Taxi conventionné et VSL à Arpajon (91290) pour vos déplacements médicaux prescrits vers les hôpitaux et cliniques de l'Essonne et d'Île-de-France.",
        nearHospitals: [
          "Hôpital Cochin",
          "Institut Gustave Roussy",
          "Hôpital Bicêtre"
        ],
        nearStations: [
          "Gare Montparnasse"
        ],
        nearAirports: [
          "Aéroport d'Orly"
        ],
        nearCities: [
          "evry-courcouronnes",
          "juvisy-sur-orge",
          "villebon-sur-yvette",
          "lisses",
          "morangis"
        ]
      },
      {
        name: "Verrières-le-Buisson",
        postalCode: "91370",
        slug: "verrieres-le-buisson",
        localText: "Taxi conventionné et VSL à Verrières-le-Buisson (91370) pour vos déplacements médicaux prescrits vers les hôpitaux et cliniques de l'Essonne et d'Île-de-France.",
        nearHospitals: [
          "Hôpital Cochin",
          "Institut Gustave Roussy"
        ],
        nearStations: [
          "Gare Montparnasse",
          "Gare d'Austerlitz"
        ],
        nearAirports: [
          "Aéroport d'Orly"
        ],
        nearCities: [
          "juvisy-sur-orge",
          "etampes",
          "viry-chatillon",
          "grigny"
        ]
      },
      {
        name: "Villemoisson-sur-Orge",
        postalCode: "91360",
        slug: "villemoisson-sur-orge",
        localText: "Taxi conventionné et VSL à Villemoisson-sur-Orge (91360) pour vos déplacements médicaux prescrits vers les hôpitaux et cliniques de l'Essonne et d'Île-de-France.",
        nearHospitals: [
          "Hôpital Cochin",
          "Institut Gustave Roussy",
          "Hôpital Bicêtre"
        ],
        nearStations: [
          "Gare Montparnasse"
        ],
        nearAirports: [
          "Aéroport d'Orly"
        ],
        nearCities: [
          "montgeron",
          "milly-la-foret",
          "draveil",
          "evry-courcouronnes",
          "yerres"
        ]
      },
      {
        name: "Boussy-Saint-Antoine",
        postalCode: "91800",
        slug: "boussy-saint-antoine",
        localText: "Taxi conventionné et VSL à Boussy-Saint-Antoine (91800) pour vos déplacements médicaux prescrits vers les hôpitaux et cliniques de l'Essonne et d'Île-de-France.",
        nearHospitals: [
          "Hôpital Cochin",
          "Institut Gustave Roussy",
          "Hôpital Bicêtre",
          "Hôpital Paul Brousse"
        ],
        nearStations: [
          "Gare Montparnasse"
        ],
        nearAirports: [
          "Aéroport d'Orly"
        ],
        nearCities: [
          "bondoufle",
          "mennecy",
          "wissous"
        ]
      },
      {
        name: "Wissous",
        postalCode: "91320",
        slug: "wissous",
        localText: "Taxi conventionné et VSL à Wissous (91320) pour vos déplacements médicaux prescrits vers les hôpitaux et cliniques de l'Essonne et d'Île-de-France.",
        nearHospitals: [
          "Hôpital Cochin",
          "Institut Gustave Roussy",
          "Hôpital Bicêtre"
        ],
        nearStations: [
          "Gare Montparnasse",
          "Gare d'Austerlitz"
        ],
        nearAirports: [
          "Aéroport d'Orly"
        ],
        nearCities: [
          "verrieres-le-buisson",
          "linas",
          "epinay-sur-orge",
          "lisses"
        ]
      },
      {
        name: "Ballainvilliers",
        postalCode: "91160",
        slug: "ballainvilliers",
        localText: "Taxi conventionné et VSL à Ballainvilliers (91160) pour vos déplacements médicaux prescrits vers les hôpitaux et cliniques de l'Essonne et d'Île-de-France.",
        nearHospitals: [
          "Hôpital Cochin",
          "Institut Gustave Roussy"
        ],
        nearStations: [
          "Gare Montparnasse",
          "Gare d'Austerlitz"
        ],
        nearAirports: [
          "Aéroport d'Orly"
        ],
        nearCities: [
          "athis-mons",
          "ris-orangis",
          "paray-vieille-poste",
          "limours",
          "bures-sur-yvette"
        ]
      },
      {
        name: "Marcoussis",
        postalCode: "91460",
        slug: "marcoussis",
        localText: "Taxi conventionné et VSL à Marcoussis (91460) pour vos déplacements médicaux prescrits vers les hôpitaux et cliniques de l'Essonne et d'Île-de-France.",
        nearHospitals: [
          "Hôpital Cochin",
          "Institut Gustave Roussy"
        ],
        nearStations: [
          "Gare Montparnasse"
        ],
        nearAirports: [
          "Aéroport d'Orly"
        ],
        nearCities: [
          "ris-orangis",
          "mennecy",
          "massy"
        ]
      },
      {
        name: "Paray-Vieille-Poste",
        postalCode: "91550",
        slug: "paray-vieille-poste",
        localText: "Taxi conventionné et VSL à Paray-Vieille-Poste (91550) pour vos déplacements médicaux prescrits vers les hôpitaux et cliniques de l'Essonne et d'Île-de-France.",
        nearHospitals: [
          "Hôpital Cochin",
          "Institut Gustave Roussy",
          "Hôpital Bicêtre"
        ],
        nearStations: [
          "Gare Montparnasse",
          "Gare d'Austerlitz"
        ],
        nearAirports: [
          "Aéroport d'Orly"
        ],
        nearCities: [
          "palaiseau",
          "bretigny-sur-orge",
          "dourdan",
          "villemoisson-sur-orge",
          "sainte-genevieve-des-bois"
        ]
      },
      {
        name: "Bures-sur-Yvette",
        postalCode: "91440",
        slug: "bures-sur-yvette",
        localText: "Taxi conventionné et VSL à Bures-sur-Yvette (91440) pour vos déplacements médicaux prescrits vers les hôpitaux et cliniques de l'Essonne et d'Île-de-France.",
        nearHospitals: [
          "Hôpital Cochin",
          "Institut Gustave Roussy",
          "Hôpital Bicêtre"
        ],
        nearStations: [
          "Gare Montparnasse"
        ],
        nearAirports: [
          "Aéroport d'Orly"
        ],
        nearCities: [
          "dourdan",
          "juvisy-sur-orge",
          "fleury-merogis",
          "bretigny-sur-orge"
        ]
      },
      {
        name: "Limours",
        postalCode: "91470",
        slug: "limours",
        localText: "Taxi conventionné et VSL à Limours (91470) pour vos déplacements médicaux prescrits vers les hôpitaux et cliniques de l'Essonne et d'Île-de-France.",
        nearHospitals: [
          "Hôpital Cochin",
          "Institut Gustave Roussy",
          "Hôpital Bicêtre"
        ],
        nearStations: [
          "Gare Montparnasse",
          "Gare d'Austerlitz"
        ],
        nearAirports: [
          "Aéroport d'Orly"
        ],
        nearCities: [
          "wissous",
          "epinay-sur-orge",
          "grigny"
        ]
      },
      {
        name: "Milly-la-Forêt",
        postalCode: "91490",
        slug: "milly-la-foret",
        localText: "Taxi conventionné et VSL à Milly-la-Forêt (91490) pour vos déplacements médicaux prescrits vers les hôpitaux et cliniques de l'Essonne et d'Île-de-France.",
        nearHospitals: [
          "Hôpital Cochin",
          "Institut Gustave Roussy",
          "Hôpital Bicêtre"
        ],
        nearStations: [
          "Gare Montparnasse",
          "Gare d'Austerlitz"
        ],
        nearAirports: [
          "Aéroport d'Orly"
        ],
        nearCities: [
          "wissous",
          "mennecy",
          "dourdan",
          "paray-vieille-poste"
        ]
      },
      {
        name: "Dourdan",
        postalCode: "91410",
        slug: "dourdan",
        localText: "Taxi conventionné et VSL à Dourdan (91410) pour vos déplacements médicaux prescrits vers les hôpitaux et cliniques de l'Essonne et d'Île-de-France.",
        nearHospitals: [
          "Hôpital Cochin",
          "Institut Gustave Roussy",
          "Hôpital Bicêtre",
          "Hôpital Paul Brousse"
        ],
        nearStations: [
          "Gare Montparnasse",
          "Gare d'Austerlitz"
        ],
        nearAirports: [
          "Aéroport d'Orly"
        ],
        nearCities: [
          "saint-michel-sur-orge",
          "linas",
          "arpajon"
        ]
      },
      {
        name: "Linas",
        postalCode: "91310",
        slug: "linas",
        localText: "Taxi conventionné et VSL à Linas (91310) pour vos déplacements médicaux prescrits vers les hôpitaux et cliniques de l'Essonne et d'Île-de-France.",
        nearHospitals: [
          "Hôpital Cochin",
          "Institut Gustave Roussy"
        ],
        nearStations: [
          "Gare Montparnasse",
          "Gare d'Austerlitz"
        ],
        nearAirports: [
          "Aéroport d'Orly"
        ],
        nearCities: [
          "savigny-sur-orge",
          "juvisy-sur-orge",
          "lisses",
          "mennecy",
          "dourdan"
        ]
      },
      {
        name: "Champlan",
        postalCode: "91160",
        slug: "champlan",
        localText: "Taxi conventionné et VSL à Champlan (91160) pour vos déplacements médicaux prescrits vers les hôpitaux et cliniques de l'Essonne et d'Île-de-France.",
        nearHospitals: [
          "Hôpital Cochin",
          "Institut Gustave Roussy",
          "Hôpital Bicêtre"
        ],
        nearStations: [
          "Gare Montparnasse",
          "Gare d'Austerlitz"
        ],
        nearAirports: [
          "Aéroport d'Orly"
        ],
        nearCities: [
          "milly-la-foret",
          "paray-vieille-poste",
          "dourdan"
        ]
      },
      {
        name: "Lisses",
        postalCode: "91090",
        slug: "lisses",
        localText: "Taxi conventionné et VSL à Lisses (91090) pour vos déplacements médicaux prescrits vers les hôpitaux et cliniques de l'Essonne et d'Île-de-France.",
        nearHospitals: [
          "Hôpital Cochin",
          "Institut Gustave Roussy"
        ],
        nearStations: [
          "Gare Montparnasse",
          "Gare d'Austerlitz"
        ],
        nearAirports: [
          "Aéroport d'Orly"
        ],
        nearCities: [
          "dourdan",
          "verrieres-le-buisson",
          "villemoisson-sur-orge",
          "orsay"
        ]
      },
      {
        name: "Soisy-sur-Seine",
        postalCode: "91450",
        slug: "soisy-sur-seine",
        localText: "Taxi conventionné et VSL à Soisy-sur-Seine (91450) pour vos déplacements médicaux prescrits vers les hôpitaux et cliniques de l'Essonne et d'Île-de-France.",
        nearHospitals: [
          "Hôpital Cochin",
          "Institut Gustave Roussy",
          "Hôpital Bicêtre",
          "Hôpital Paul Brousse"
        ],
        nearStations: [
          "Gare Montparnasse"
        ],
        nearAirports: [
          "Aéroport d'Orly"
        ],
        nearCities: [
          "brunoy",
          "sainte-genevieve-des-bois",
          "limours"
        ]
      }
    ]
  },
  {
    code: "92",
    name: "Hauts-de-Seine",
    slug: "taxi-conventionne-hauts-de-seine-92",
    metaTitle: "Taxi conventionné & VSL Hauts-de-Seine (92) | VSL et transport médical",
    metaDescription: "Taxi conventionné & VSL dans les Hauts-de-Seine (92). Transport médical assis vers hôpitaux et cliniques, tiers-payant selon prescription.",
    h1: "Taxi conventionné & VSL dans les Hauts-de-Seine (92)",
    content: "<p>Notre service de taxi conventionné & VSL intervient dans tout le département des Hauts-de-Seine (92). Transport médical assis vers Paris et l’Île-de-France.</p>",
    cities: [
      {
        name: "Antony",
        postalCode: "92160",
        slug: "antony",
        localText: "Taxi conventionné et VSL à Antony (92160) pour vos déplacements médicaux prescrits vers les hôpitaux et cliniques des Hauts-de-Seine et de Paris.",
        nearHospitals: [
          "Hôpital Georges Pompidou",
          "Hôpital Necker",
          "Institut Curie",
          "Hôpital Foch"
        ],
        nearStations: [
          "Gare Saint-Lazare",
          "Gare Montparnasse"
        ],
        nearAirports: [
          "Aéroport d'Orly"
        ],
        nearCities: [
          "saint-cloud",
          "clichy",
          "courbevoie",
          "garches"
        ]
      },
      {
        name: "Asnières-sur-Seine",
        postalCode: "92600",
        slug: "asnieres-sur-seine",
        localText: "Taxi conventionné et VSL à Asnières-sur-Seine (92600) pour vos déplacements médicaux prescrits vers les hôpitaux et cliniques des Hauts-de-Seine et de Paris.",
        nearHospitals: [
          "Hôpital Georges Pompidou",
          "Hôpital Necker"
        ],
        nearStations: [
          "Gare Saint-Lazare"
        ],
        nearAirports: [
          "Aéroport d'Orly"
        ],
        nearCities: [
          "chatenay-malabry",
          "puteaux",
          "montrouge",
          "colombes"
        ]
      },
      {
        name: "Bagneux",
        postalCode: "92220",
        slug: "bagneux",
        localText: "Taxi conventionné et VSL à Bagneux (92220) pour vos déplacements médicaux prescrits vers les hôpitaux et cliniques des Hauts-de-Seine et de Paris.",
        nearHospitals: [
          "Hôpital Georges Pompidou",
          "Hôpital Necker"
        ],
        nearStations: [
          "Gare Saint-Lazare",
          "Gare Montparnasse"
        ],
        nearAirports: [
          "Aéroport d'Orly"
        ],
        nearCities: [
          "neuilly-sur-seine",
          "nanterre",
          "le-plessis-robinson",
          "bois-colombes",
          "bourg-la-reine"
        ]
      },
      {
        name: "Bois-Colombes",
        postalCode: "92270",
        slug: "bois-colombes",
        localText: "Taxi conventionné et VSL à Bois-Colombes (92270) pour vos déplacements médicaux prescrits vers les hôpitaux et cliniques des Hauts-de-Seine et de Paris.",
        nearHospitals: [
          "Hôpital Georges Pompidou",
          "Hôpital Necker",
          "Institut Curie"
        ],
        nearStations: [
          "Gare Saint-Lazare",
          "Gare Montparnasse"
        ],
        nearAirports: [
          "Aéroport d'Orly"
        ],
        nearCities: [
          "antony",
          "montrouge",
          "bourg-la-reine",
          "boulogne-billancourt"
        ]
      },
      {
        name: "Boulogne-Billancourt",
        postalCode: "92100",
        slug: "boulogne-billancourt",
        localText: "Taxi conventionné et VSL à Boulogne-Billancourt (92100) pour vos déplacements médicaux prescrits vers les hôpitaux et cliniques des Hauts-de-Seine et de Paris.",
        nearHospitals: [
          "Hôpital Georges Pompidou",
          "Hôpital Necker",
          "Institut Curie",
          "Hôpital Foch"
        ],
        nearStations: [
          "Gare Saint-Lazare",
          "Gare Montparnasse"
        ],
        nearAirports: [
          "Aéroport d'Orly"
        ],
        nearCities: [
          "levallois-perret",
          "sevres",
          "issy-les-moulineaux",
          "saint-cloud"
        ]
      },
      {
        name: "Bourg-la-Reine",
        postalCode: "92340",
        slug: "bourg-la-reine",
        localText: "Taxi conventionné et VSL à Bourg-la-Reine (92340) pour vos déplacements médicaux prescrits vers les hôpitaux et cliniques des Hauts-de-Seine et de Paris.",
        nearHospitals: [
          "Hôpital Georges Pompidou",
          "Hôpital Necker",
          "Institut Curie",
          "Hôpital Foch"
        ],
        nearStations: [
          "Gare Saint-Lazare",
          "Gare Montparnasse"
        ],
        nearAirports: [
          "Aéroport d'Orly"
        ],
        nearCities: [
          "antony",
          "puteaux",
          "asnieres-sur-seine",
          "marnes-la-coquette"
        ]
      },
      {
        name: "Châtenay-Malabry",
        postalCode: "92290",
        slug: "chatenay-malabry",
        localText: "Taxi conventionné et VSL à Châtenay-Malabry (92290) pour vos déplacements médicaux prescrits vers les hôpitaux et cliniques des Hauts-de-Seine et de Paris.",
        nearHospitals: [
          "Hôpital Georges Pompidou",
          "Hôpital Necker"
        ],
        nearStations: [
          "Gare Saint-Lazare"
        ],
        nearAirports: [
          "Aéroport d'Orly"
        ],
        nearCities: [
          "bagneux",
          "levallois-perret",
          "nanterre",
          "vaucresson",
          "chaville"
        ]
      },
      {
        name: "Châtillon",
        postalCode: "92320",
        slug: "chatillon",
        localText: "Taxi conventionné et VSL à Châtillon (92320) pour vos déplacements médicaux prescrits vers les hôpitaux et cliniques des Hauts-de-Seine et de Paris.",
        nearHospitals: [
          "Hôpital Georges Pompidou",
          "Hôpital Necker",
          "Institut Curie",
          "Hôpital Foch"
        ],
        nearStations: [
          "Gare Saint-Lazare",
          "Gare Montparnasse"
        ],
        nearAirports: [
          "Aéroport d'Orly"
        ],
        nearCities: [
          "bois-colombes",
          "bourg-la-reine",
          "le-plessis-robinson",
          "colombes"
        ]
      },
      {
        name: "Chaville",
        postalCode: "92370",
        slug: "chaville",
        localText: "Taxi conventionné et VSL à Chaville (92370) pour vos déplacements médicaux prescrits vers les hôpitaux et cliniques des Hauts-de-Seine et de Paris.",
        nearHospitals: [
          "Hôpital Georges Pompidou",
          "Hôpital Necker",
          "Institut Curie"
        ],
        nearStations: [
          "Gare Saint-Lazare",
          "Gare Montparnasse"
        ],
        nearAirports: [
          "Aéroport d'Orly"
        ],
        nearCities: [
          "montrouge",
          "neuilly-sur-seine",
          "clichy",
          "nanterre",
          "meudon"
        ]
      },
      {
        name: "Clamart",
        postalCode: "92140",
        slug: "clamart",
        localText: "Taxi conventionné et VSL à Clamart (92140) pour vos déplacements médicaux prescrits vers les hôpitaux et cliniques des Hauts-de-Seine et de Paris.",
        nearHospitals: [
          "Hôpital Georges Pompidou",
          "Hôpital Necker",
          "Institut Curie"
        ],
        nearStations: [
          "Gare Saint-Lazare"
        ],
        nearAirports: [
          "Aéroport d'Orly"
        ],
        nearCities: [
          "garches",
          "malakoff",
          "colombes"
        ]
      },
      {
        name: "Clichy",
        postalCode: "92110",
        slug: "clichy",
        localText: "Taxi conventionné et VSL à Clichy (92110) pour vos déplacements médicaux prescrits vers les hôpitaux et cliniques des Hauts-de-Seine et de Paris.",
        nearHospitals: [
          "Hôpital Georges Pompidou",
          "Hôpital Necker"
        ],
        nearStations: [
          "Gare Saint-Lazare",
          "Gare Montparnasse"
        ],
        nearAirports: [
          "Aéroport d'Orly"
        ],
        nearCities: [
          "clamart",
          "chatillon",
          "boulogne-billancourt",
          "puteaux"
        ]
      },
      {
        name: "Colombes",
        postalCode: "92700",
        slug: "colombes",
        localText: "Taxi conventionné et VSL à Colombes (92700) pour vos déplacements médicaux prescrits vers les hôpitaux et cliniques des Hauts-de-Seine et de Paris.",
        nearHospitals: [
          "Hôpital Georges Pompidou",
          "Hôpital Necker",
          "Institut Curie"
        ],
        nearStations: [
          "Gare Saint-Lazare",
          "Gare Montparnasse"
        ],
        nearAirports: [
          "Aéroport d'Orly"
        ],
        nearCities: [
          "ville-d-avray",
          "fontenay-aux-roses",
          "antony",
          "levallois-perret",
          "asnieres-sur-seine"
        ]
      },
      {
        name: "Courbevoie",
        postalCode: "92400",
        slug: "courbevoie",
        localText: "Taxi conventionné et VSL à Courbevoie (92400) pour vos déplacements médicaux prescrits vers les hôpitaux et cliniques des Hauts-de-Seine et de Paris.",
        nearHospitals: [
          "Hôpital Georges Pompidou",
          "Hôpital Necker",
          "Institut Curie"
        ],
        nearStations: [
          "Gare Saint-Lazare",
          "Gare Montparnasse"
        ],
        nearAirports: [
          "Aéroport d'Orly"
        ],
        nearCities: [
          "clichy",
          "bagneux",
          "vanves",
          "antony"
        ]
      },
      {
        name: "Fontenay-aux-Roses",
        postalCode: "92260",
        slug: "fontenay-aux-roses",
        localText: "Taxi conventionné et VSL à Fontenay-aux-Roses (92260) pour vos déplacements médicaux prescrits vers les hôpitaux et cliniques des Hauts-de-Seine et de Paris.",
        nearHospitals: [
          "Hôpital Georges Pompidou",
          "Hôpital Necker",
          "Institut Curie"
        ],
        nearStations: [
          "Gare Saint-Lazare"
        ],
        nearAirports: [
          "Aéroport d'Orly"
        ],
        nearCities: [
          "rueil-malmaison",
          "villeneuve-la-garenne",
          "suresnes",
          "sceaux"
        ]
      },
      {
        name: "Garches",
        postalCode: "92380",
        slug: "garches",
        localText: "Taxi conventionné et VSL à Garches (92380) pour vos déplacements médicaux prescrits vers les hôpitaux et cliniques des Hauts-de-Seine et de Paris.",
        nearHospitals: [
          "Hôpital Georges Pompidou",
          "Hôpital Necker",
          "Institut Curie"
        ],
        nearStations: [
          "Gare Saint-Lazare"
        ],
        nearAirports: [
          "Aéroport d'Orly"
        ],
        nearCities: [
          "fontenay-aux-roses",
          "vaucresson",
          "sceaux"
        ]
      },
      {
        name: "La Garenne-Colombes",
        postalCode: "92250",
        slug: "la-garenne-colombes",
        localText: "Taxi conventionné et VSL à La Garenne-Colombes (92250) pour vos déplacements médicaux prescrits vers les hôpitaux et cliniques des Hauts-de-Seine et de Paris.",
        nearHospitals: [
          "Hôpital Georges Pompidou",
          "Hôpital Necker",
          "Institut Curie"
        ],
        nearStations: [
          "Gare Saint-Lazare"
        ],
        nearAirports: [
          "Aéroport d'Orly"
        ],
        nearCities: [
          "chatillon",
          "issy-les-moulineaux",
          "clamart",
          "chatenay-malabry"
        ]
      },
      {
        name: "Gennevilliers",
        postalCode: "92230",
        slug: "gennevilliers",
        localText: "Taxi conventionné et VSL à Gennevilliers (92230) pour vos déplacements médicaux prescrits vers les hôpitaux et cliniques des Hauts-de-Seine et de Paris.",
        nearHospitals: [
          "Hôpital Georges Pompidou",
          "Hôpital Necker",
          "Institut Curie"
        ],
        nearStations: [
          "Gare Saint-Lazare",
          "Gare Montparnasse"
        ],
        nearAirports: [
          "Aéroport d'Orly"
        ],
        nearCities: [
          "sevres",
          "chaville",
          "garches",
          "malakoff"
        ]
      },
      {
        name: "Issy-les-Moulineaux",
        postalCode: "92130",
        slug: "issy-les-moulineaux",
        localText: "Taxi conventionné et VSL à Issy-les-Moulineaux (92130) pour vos déplacements médicaux prescrits vers les hôpitaux et cliniques des Hauts-de-Seine et de Paris.",
        nearHospitals: [
          "Hôpital Georges Pompidou",
          "Hôpital Necker",
          "Institut Curie",
          "Hôpital Foch"
        ],
        nearStations: [
          "Gare Saint-Lazare",
          "Gare Montparnasse"
        ],
        nearAirports: [
          "Aéroport d'Orly"
        ],
        nearCities: [
          "suresnes",
          "sevres",
          "marnes-la-coquette"
        ]
      },
      {
        name: "Levallois-Perret",
        postalCode: "92300",
        slug: "levallois-perret",
        localText: "Taxi conventionné et VSL à Levallois-Perret (92300) pour vos déplacements médicaux prescrits vers les hôpitaux et cliniques des Hauts-de-Seine et de Paris.",
        nearHospitals: [
          "Hôpital Georges Pompidou",
          "Hôpital Necker",
          "Institut Curie",
          "Hôpital Foch"
        ],
        nearStations: [
          "Gare Saint-Lazare"
        ],
        nearAirports: [
          "Aéroport d'Orly"
        ],
        nearCities: [
          "chaville",
          "malakoff",
          "chatenay-malabry",
          "ville-d-avray",
          "vaucresson"
        ]
      },
      {
        name: "Malakoff",
        postalCode: "92240",
        slug: "malakoff",
        localText: "Taxi conventionné et VSL à Malakoff (92240) pour vos déplacements médicaux prescrits vers les hôpitaux et cliniques des Hauts-de-Seine et de Paris.",
        nearHospitals: [
          "Hôpital Georges Pompidou",
          "Hôpital Necker"
        ],
        nearStations: [
          "Gare Saint-Lazare",
          "Gare Montparnasse"
        ],
        nearAirports: [
          "Aéroport d'Orly"
        ],
        nearCities: [
          "colombes",
          "sceaux",
          "puteaux",
          "clichy"
        ]
      },
      {
        name: "Marnes-la-Coquette",
        postalCode: "92430",
        slug: "marnes-la-coquette",
        localText: "Taxi conventionné et VSL à Marnes-la-Coquette (92430) pour vos déplacements médicaux prescrits vers les hôpitaux et cliniques des Hauts-de-Seine et de Paris.",
        nearHospitals: [
          "Hôpital Georges Pompidou",
          "Hôpital Necker"
        ],
        nearStations: [
          "Gare Saint-Lazare",
          "Gare Montparnasse"
        ],
        nearAirports: [
          "Aéroport d'Orly"
        ],
        nearCities: [
          "vanves",
          "clichy",
          "clamart",
          "chaville"
        ]
      },
      {
        name: "Meudon",
        postalCode: "92190",
        slug: "meudon",
        localText: "Taxi conventionné et VSL à Meudon (92190) pour vos déplacements médicaux prescrits vers les hôpitaux et cliniques des Hauts-de-Seine et de Paris.",
        nearHospitals: [
          "Hôpital Georges Pompidou",
          "Hôpital Necker",
          "Institut Curie"
        ],
        nearStations: [
          "Gare Saint-Lazare"
        ],
        nearAirports: [
          "Aéroport d'Orly"
        ],
        nearCities: [
          "antony",
          "asnieres-sur-seine",
          "bagneux",
          "malakoff"
        ]
      },
      {
        name: "Montrouge",
        postalCode: "92120",
        slug: "montrouge",
        localText: "Taxi conventionné et VSL à Montrouge (92120) pour vos déplacements médicaux prescrits vers les hôpitaux et cliniques des Hauts-de-Seine et de Paris.",
        nearHospitals: [
          "Hôpital Georges Pompidou",
          "Hôpital Necker"
        ],
        nearStations: [
          "Gare Saint-Lazare",
          "Gare Montparnasse"
        ],
        nearAirports: [
          "Aéroport d'Orly"
        ],
        nearCities: [
          "ville-d-avray",
          "suresnes",
          "antony",
          "bourg-la-reine"
        ]
      },
      {
        name: "Nanterre",
        postalCode: "92000",
        slug: "nanterre",
        localText: "Taxi conventionné et VSL à Nanterre (92000) pour vos déplacements médicaux prescrits vers les hôpitaux et cliniques des Hauts-de-Seine et de Paris.",
        nearHospitals: [
          "Hôpital Georges Pompidou",
          "Hôpital Necker"
        ],
        nearStations: [
          "Gare Saint-Lazare",
          "Gare Montparnasse"
        ],
        nearAirports: [
          "Aéroport d'Orly"
        ],
        nearCities: [
          "bagneux",
          "gennevilliers",
          "vanves",
          "levallois-perret"
        ]
      },
      {
        name: "Neuilly-sur-Seine",
        postalCode: "92200",
        slug: "neuilly-sur-seine",
        localText: "Taxi conventionné et VSL à Neuilly-sur-Seine (92200) pour vos déplacements médicaux prescrits vers les hôpitaux et cliniques des Hauts-de-Seine et de Paris.",
        nearHospitals: [
          "Hôpital Georges Pompidou",
          "Hôpital Necker",
          "Institut Curie"
        ],
        nearStations: [
          "Gare Saint-Lazare"
        ],
        nearAirports: [
          "Aéroport d'Orly"
        ],
        nearCities: [
          "nanterre",
          "saint-cloud",
          "bagneux",
          "asnieres-sur-seine"
        ]
      },
      {
        name: "Le Plessis-Robinson",
        postalCode: "92350",
        slug: "le-plessis-robinson",
        localText: "Taxi conventionné et VSL à Le Plessis-Robinson (92350) pour vos déplacements médicaux prescrits vers les hôpitaux et cliniques des Hauts-de-Seine et de Paris.",
        nearHospitals: [
          "Hôpital Georges Pompidou",
          "Hôpital Necker",
          "Institut Curie",
          "Hôpital Foch"
        ],
        nearStations: [
          "Gare Saint-Lazare",
          "Gare Montparnasse"
        ],
        nearAirports: [
          "Aéroport d'Orly"
        ],
        nearCities: [
          "puteaux",
          "fontenay-aux-roses",
          "clamart"
        ]
      },
      {
        name: "Puteaux",
        postalCode: "92800",
        slug: "puteaux",
        localText: "Taxi conventionné et VSL à Puteaux (92800) pour vos déplacements médicaux prescrits vers les hôpitaux et cliniques des Hauts-de-Seine et de Paris.",
        nearHospitals: [
          "Hôpital Georges Pompidou",
          "Hôpital Necker"
        ],
        nearStations: [
          "Gare Saint-Lazare",
          "Gare Montparnasse"
        ],
        nearAirports: [
          "Aéroport d'Orly"
        ],
        nearCities: [
          "neuilly-sur-seine",
          "bourg-la-reine",
          "levallois-perret"
        ]
      },
      {
        name: "Rueil-Malmaison",
        postalCode: "92500",
        slug: "rueil-malmaison",
        localText: "Taxi conventionné et VSL à Rueil-Malmaison (92500) pour vos déplacements médicaux prescrits vers les hôpitaux et cliniques des Hauts-de-Seine et de Paris.",
        nearHospitals: [
          "Hôpital Georges Pompidou",
          "Hôpital Necker"
        ],
        nearStations: [
          "Gare Saint-Lazare",
          "Gare Montparnasse"
        ],
        nearAirports: [
          "Aéroport d'Orly"
        ],
        nearCities: [
          "bois-colombes",
          "clichy",
          "neuilly-sur-seine",
          "sevres",
          "asnieres-sur-seine"
        ]
      },
      {
        name: "Saint-Cloud",
        postalCode: "92210",
        slug: "saint-cloud",
        localText: "Taxi conventionné et VSL à Saint-Cloud (92210) pour vos déplacements médicaux prescrits vers les hôpitaux et cliniques des Hauts-de-Seine et de Paris.",
        nearHospitals: [
          "Hôpital Georges Pompidou",
          "Hôpital Necker",
          "Institut Curie"
        ],
        nearStations: [
          "Gare Saint-Lazare",
          "Gare Montparnasse"
        ],
        nearAirports: [
          "Aéroport d'Orly"
        ],
        nearCities: [
          "garches",
          "bois-colombes",
          "marnes-la-coquette"
        ]
      },
      {
        name: "Sceaux",
        postalCode: "92330",
        slug: "sceaux",
        localText: "Taxi conventionné et VSL à Sceaux (92330) pour vos déplacements médicaux prescrits vers les hôpitaux et cliniques des Hauts-de-Seine et de Paris.",
        nearHospitals: [
          "Hôpital Georges Pompidou",
          "Hôpital Necker",
          "Institut Curie"
        ],
        nearStations: [
          "Gare Saint-Lazare",
          "Gare Montparnasse"
        ],
        nearAirports: [
          "Aéroport d'Orly"
        ],
        nearCities: [
          "gennevilliers",
          "meudon",
          "chatillon"
        ]
      },
      {
        name: "Sèvres",
        postalCode: "92310",
        slug: "sevres",
        localText: "Taxi conventionné et VSL à Sèvres (92310) pour vos déplacements médicaux prescrits vers les hôpitaux et cliniques des Hauts-de-Seine et de Paris.",
        nearHospitals: [
          "Hôpital Georges Pompidou",
          "Hôpital Necker",
          "Institut Curie"
        ],
        nearStations: [
          "Gare Saint-Lazare"
        ],
        nearAirports: [
          "Aéroport d'Orly"
        ],
        nearCities: [
          "puteaux",
          "villeneuve-la-garenne",
          "antony"
        ]
      },
      {
        name: "Suresnes",
        postalCode: "92150",
        slug: "suresnes",
        localText: "Taxi conventionné et VSL à Suresnes (92150) pour vos déplacements médicaux prescrits vers les hôpitaux et cliniques des Hauts-de-Seine et de Paris.",
        nearHospitals: [
          "Hôpital Georges Pompidou",
          "Hôpital Necker"
        ],
        nearStations: [
          "Gare Saint-Lazare",
          "Gare Montparnasse"
        ],
        nearAirports: [
          "Aéroport d'Orly"
        ],
        nearCities: [
          "ville-d-avray",
          "garches",
          "meudon"
        ]
      },
      {
        name: "Vanves",
        postalCode: "92170",
        slug: "vanves",
        localText: "Taxi conventionné et VSL à Vanves (92170) pour vos déplacements médicaux prescrits vers les hôpitaux et cliniques des Hauts-de-Seine et de Paris.",
        nearHospitals: [
          "Hôpital Georges Pompidou",
          "Hôpital Necker",
          "Institut Curie",
          "Hôpital Foch"
        ],
        nearStations: [
          "Gare Saint-Lazare"
        ],
        nearAirports: [
          "Aéroport d'Orly"
        ],
        nearCities: [
          "boulogne-billancourt",
          "garches",
          "rueil-malmaison",
          "chatillon"
        ]
      },
      {
        name: "Vaucresson",
        postalCode: "92420",
        slug: "vaucresson",
        localText: "Taxi conventionné et VSL à Vaucresson (92420) pour vos déplacements médicaux prescrits vers les hôpitaux et cliniques des Hauts-de-Seine et de Paris.",
        nearHospitals: [
          "Hôpital Georges Pompidou",
          "Hôpital Necker",
          "Institut Curie",
          "Hôpital Foch"
        ],
        nearStations: [
          "Gare Saint-Lazare",
          "Gare Montparnasse"
        ],
        nearAirports: [
          "Aéroport d'Orly"
        ],
        nearCities: [
          "garches",
          "antony",
          "marnes-la-coquette",
          "colombes"
        ]
      },
      {
        name: "Ville-d'Avray",
        postalCode: "92410",
        slug: "ville-d-avray",
        localText: "Taxi conventionné et VSL à Ville-d'Avray (92410) pour vos déplacements médicaux prescrits vers les hôpitaux et cliniques des Hauts-de-Seine et de Paris.",
        nearHospitals: [
          "Hôpital Georges Pompidou",
          "Hôpital Necker",
          "Institut Curie",
          "Hôpital Foch"
        ],
        nearStations: [
          "Gare Saint-Lazare",
          "Gare Montparnasse"
        ],
        nearAirports: [
          "Aéroport d'Orly"
        ],
        nearCities: [
          "chatenay-malabry",
          "garches",
          "suresnes",
          "levallois-perret"
        ]
      },
      {
        name: "Villeneuve-la-Garenne",
        postalCode: "92390",
        slug: "villeneuve-la-garenne",
        localText: "Taxi conventionné et VSL à Villeneuve-la-Garenne (92390) pour vos déplacements médicaux prescrits vers les hôpitaux et cliniques des Hauts-de-Seine et de Paris.",
        nearHospitals: [
          "Hôpital Georges Pompidou",
          "Hôpital Necker",
          "Institut Curie",
          "Hôpital Foch"
        ],
        nearStations: [
          "Gare Saint-Lazare"
        ],
        nearAirports: [
          "Aéroport d'Orly"
        ],
        nearCities: [
          "courbevoie",
          "antony",
          "chaville",
          "marnes-la-coquette",
          "asnieres-sur-seine"
        ]
      }
    ]
  },
  {
    code: "93",
    name: "Seine-Saint-Denis",
    slug: "taxi-conventionne-seine-saint-denis-93",
    metaTitle: "Taxi conventionné & VSL Seine-Saint-Denis (93) | VSL et transport médical",
    metaDescription: "Taxi conventionné & VSL en Seine-Saint-Denis (93). Transport médical assis vers hôpitaux et cliniques, tiers-payant selon prescription.",
    h1: "Taxi conventionné & VSL en Seine-Saint-Denis (93)",
    content: "<p>Notre service de taxi conventionné & VSL dessert l’ensemble de la Seine-Saint-Denis (93). Nous assurons vos transports médicaux en position assise vers les hôpitaux de Paris et d’Île-de-France.</p>",
    cities: [
      {
        name: "Aubervilliers",
        postalCode: "93300",
        slug: "aubervilliers",
        localText: "Taxi conventionné et VSL à Aubervilliers (93300) pour vos déplacements médicaux prescrits vers les hôpitaux et cliniques de Seine-Saint-Denis et de Paris.",
        nearHospitals: [
          "Hôpital Bichat",
          "Hôpital Lariboisière"
        ],
        nearStations: [
          "Gare du Nord"
        ],
        nearAirports: [
          "Aéroport Charles de Gaulle",
          "Aéroport du Bourget"
        ],
        nearCities: [
          "le-bourget",
          "bobigny",
          "les-pavillons-sous-bois",
          "tremblay-en-france"
        ]
      },
      {
        name: "Aulnay-sous-Bois",
        postalCode: "93600",
        slug: "aulnay-sous-bois",
        localText: "Taxi conventionné et VSL à Aulnay-sous-Bois (93600) pour vos déplacements médicaux prescrits vers les hôpitaux et cliniques de Seine-Saint-Denis et de Paris.",
        nearHospitals: [
          "Hôpital Bichat",
          "Hôpital Lariboisière",
          "Hôpital Saint-Louis"
        ],
        nearStations: [
          "Gare du Nord"
        ],
        nearAirports: [
          "Aéroport Charles de Gaulle",
          "Aéroport du Bourget"
        ],
        nearCities: [
          "bobigny",
          "le-blanc-mesnil",
          "bagnolet",
          "montreuil",
          "les-lilas"
        ]
      },
      {
        name: "Bagnolet",
        postalCode: "93170",
        slug: "bagnolet",
        localText: "Taxi conventionné et VSL à Bagnolet (93170) pour vos déplacements médicaux prescrits vers les hôpitaux et cliniques de Seine-Saint-Denis et de Paris.",
        nearHospitals: [
          "Hôpital Bichat",
          "Hôpital Lariboisière",
          "Hôpital Saint-Louis"
        ],
        nearStations: [
          "Gare du Nord"
        ],
        nearAirports: [
          "Aéroport Charles de Gaulle",
          "Aéroport du Bourget"
        ],
        nearCities: [
          "aubervilliers",
          "les-lilas",
          "romainville",
          "bondy",
          "villepinte"
        ]
      },
      {
        name: "Le Blanc-Mesnil",
        postalCode: "93150",
        slug: "le-blanc-mesnil",
        localText: "Taxi conventionné et VSL à Le Blanc-Mesnil (93150) pour vos déplacements médicaux prescrits vers les hôpitaux et cliniques de Seine-Saint-Denis et de Paris.",
        nearHospitals: [
          "Hôpital Bichat",
          "Hôpital Lariboisière",
          "Hôpital Saint-Louis"
        ],
        nearStations: [
          "Gare du Nord",
          "Gare de l'Est"
        ],
        nearAirports: [
          "Aéroport Charles de Gaulle",
          "Aéroport du Bourget"
        ],
        nearCities: [
          "saint-denis",
          "coubron",
          "saint-ouen-sur-seine",
          "la-courneuve"
        ]
      },
      {
        name: "Bobigny",
        postalCode: "93000",
        slug: "bobigny",
        localText: "Taxi conventionné et VSL à Bobigny (93000) pour vos déplacements médicaux prescrits vers les hôpitaux et cliniques de Seine-Saint-Denis et de Paris.",
        nearHospitals: [
          "Hôpital Bichat",
          "Hôpital Lariboisière",
          "Hôpital Saint-Louis"
        ],
        nearStations: [
          "Gare du Nord",
          "Gare de l'Est"
        ],
        nearAirports: [
          "Aéroport Charles de Gaulle",
          "Aéroport du Bourget"
        ],
        nearCities: [
          "la-courneuve",
          "drancy",
          "pantin",
          "neuilly-plaisance"
        ]
      },
      {
        name: "Bondy",
        postalCode: "93140",
        slug: "bondy",
        localText: "Taxi conventionné et VSL à Bondy (93140) pour vos déplacements médicaux prescrits vers les hôpitaux et cliniques de Seine-Saint-Denis et de Paris.",
        nearHospitals: [
          "Hôpital Bichat",
          "Hôpital Lariboisière"
        ],
        nearStations: [
          "Gare du Nord",
          "Gare de l'Est"
        ],
        nearAirports: [
          "Aéroport Charles de Gaulle",
          "Aéroport du Bourget"
        ],
        nearCities: [
          "le-raincy",
          "gournay-sur-marne",
          "sevran"
        ]
      },
      {
        name: "Le Bourget",
        postalCode: "93350",
        slug: "le-bourget",
        localText: "Taxi conventionné et VSL à Le Bourget (93350) pour vos déplacements médicaux prescrits vers les hôpitaux et cliniques de Seine-Saint-Denis et de Paris.",
        nearHospitals: [
          "Hôpital Bichat",
          "Hôpital Lariboisière"
        ],
        nearStations: [
          "Gare du Nord",
          "Gare de l'Est"
        ],
        nearAirports: [
          "Aéroport Charles de Gaulle",
          "Aéroport du Bourget"
        ],
        nearCities: [
          "dugny",
          "villemomble",
          "saint-denis"
        ]
      },
      {
        name: "Clichy-sous-Bois",
        postalCode: "93390",
        slug: "clichy-sous-bois",
        localText: "Taxi conventionné et VSL à Clichy-sous-Bois (93390) pour vos déplacements médicaux prescrits vers les hôpitaux et cliniques de Seine-Saint-Denis et de Paris.",
        nearHospitals: [
          "Hôpital Bichat",
          "Hôpital Lariboisière"
        ],
        nearStations: [
          "Gare du Nord",
          "Gare de l'Est"
        ],
        nearAirports: [
          "Aéroport Charles de Gaulle",
          "Aéroport du Bourget"
        ],
        nearCities: [
          "aulnay-sous-bois",
          "montreuil",
          "drancy",
          "la-courneuve",
          "villepinte"
        ]
      },
      {
        name: "Coubron",
        postalCode: "93470",
        slug: "coubron",
        localText: "Taxi conventionné et VSL à Coubron (93470) pour vos déplacements médicaux prescrits vers les hôpitaux et cliniques de Seine-Saint-Denis et de Paris.",
        nearHospitals: [
          "Hôpital Bichat",
          "Hôpital Lariboisière",
          "Hôpital Saint-Louis"
        ],
        nearStations: [
          "Gare du Nord",
          "Gare de l'Est"
        ],
        nearAirports: [
          "Aéroport Charles de Gaulle",
          "Aéroport du Bourget"
        ],
        nearCities: [
          "gournay-sur-marne",
          "neuilly-sur-marne",
          "pantin",
          "saint-ouen-sur-seine",
          "montreuil"
        ]
      },
      {
        name: "La Courneuve",
        postalCode: "93120",
        slug: "la-courneuve",
        localText: "Taxi conventionné et VSL à La Courneuve (93120) pour vos déplacements médicaux prescrits vers les hôpitaux et cliniques de Seine-Saint-Denis et de Paris.",
        nearHospitals: [
          "Hôpital Bichat",
          "Hôpital Lariboisière",
          "Hôpital Saint-Louis"
        ],
        nearStations: [
          "Gare du Nord",
          "Gare de l'Est"
        ],
        nearAirports: [
          "Aéroport Charles de Gaulle",
          "Aéroport du Bourget"
        ],
        nearCities: [
          "epinay-sur-seine",
          "saint-denis",
          "aubervilliers"
        ]
      },
      {
        name: "Drancy",
        postalCode: "93700",
        slug: "drancy",
        localText: "Taxi conventionné et VSL à Drancy (93700) pour vos déplacements médicaux prescrits vers les hôpitaux et cliniques de Seine-Saint-Denis et de Paris.",
        nearHospitals: [
          "Hôpital Bichat",
          "Hôpital Lariboisière",
          "Hôpital Saint-Louis",
          "Hôpital Robert Debré"
        ],
        nearStations: [
          "Gare du Nord",
          "Gare de l'Est"
        ],
        nearAirports: [
          "Aéroport Charles de Gaulle",
          "Aéroport du Bourget"
        ],
        nearCities: [
          "les-pavillons-sous-bois",
          "montfermeil",
          "sevran",
          "villepinte"
        ]
      },
      {
        name: "Dugny",
        postalCode: "93440",
        slug: "dugny",
        localText: "Taxi conventionné et VSL à Dugny (93440) pour vos déplacements médicaux prescrits vers les hôpitaux et cliniques de Seine-Saint-Denis et de Paris.",
        nearHospitals: [
          "Hôpital Bichat",
          "Hôpital Lariboisière"
        ],
        nearStations: [
          "Gare du Nord",
          "Gare de l'Est"
        ],
        nearAirports: [
          "Aéroport Charles de Gaulle",
          "Aéroport du Bourget"
        ],
        nearCities: [
          "villemomble",
          "aubervilliers",
          "epinay-sur-seine",
          "villetaneuse",
          "tremblay-en-france"
        ]
      },
      {
        name: "Épinay-sur-Seine",
        postalCode: "93800",
        slug: "epinay-sur-seine",
        localText: "Taxi conventionné et VSL à Épinay-sur-Seine (93800) pour vos déplacements médicaux prescrits vers les hôpitaux et cliniques de Seine-Saint-Denis et de Paris.",
        nearHospitals: [
          "Hôpital Bichat",
          "Hôpital Lariboisière",
          "Hôpital Saint-Louis",
          "Hôpital Robert Debré"
        ],
        nearStations: [
          "Gare du Nord",
          "Gare de l'Est"
        ],
        nearAirports: [
          "Aéroport Charles de Gaulle",
          "Aéroport du Bourget"
        ],
        nearCities: [
          "clichy-sous-bois",
          "drancy",
          "montreuil",
          "l-ile-saint-denis"
        ]
      },
      {
        name: "Gagny",
        postalCode: "93220",
        slug: "gagny",
        localText: "Taxi conventionné et VSL à Gagny (93220) pour vos déplacements médicaux prescrits vers les hôpitaux et cliniques de Seine-Saint-Denis et de Paris.",
        nearHospitals: [
          "Hôpital Bichat",
          "Hôpital Lariboisière",
          "Hôpital Saint-Louis"
        ],
        nearStations: [
          "Gare du Nord",
          "Gare de l'Est"
        ],
        nearAirports: [
          "Aéroport Charles de Gaulle",
          "Aéroport du Bourget"
        ],
        nearCities: [
          "stains",
          "le-blanc-mesnil",
          "la-courneuve",
          "le-bourget",
          "romainville"
        ]
      },
      {
        name: "Gournay-sur-Marne",
        postalCode: "93460",
        slug: "gournay-sur-marne",
        localText: "Taxi conventionné et VSL à Gournay-sur-Marne (93460) pour vos déplacements médicaux prescrits vers les hôpitaux et cliniques de Seine-Saint-Denis et de Paris.",
        nearHospitals: [
          "Hôpital Bichat",
          "Hôpital Lariboisière",
          "Hôpital Saint-Louis",
          "Hôpital Robert Debré"
        ],
        nearStations: [
          "Gare du Nord",
          "Gare de l'Est"
        ],
        nearAirports: [
          "Aéroport Charles de Gaulle",
          "Aéroport du Bourget"
        ],
        nearCities: [
          "rosny-sous-bois",
          "saint-ouen-sur-seine",
          "les-lilas",
          "romainville"
        ]
      },
      {
        name: "L'Île-Saint-Denis",
        postalCode: "93450",
        slug: "l-ile-saint-denis",
        localText: "Taxi conventionné et VSL à L'Île-Saint-Denis (93450) pour vos déplacements médicaux prescrits vers les hôpitaux et cliniques de Seine-Saint-Denis et de Paris.",
        nearHospitals: [
          "Hôpital Bichat",
          "Hôpital Lariboisière",
          "Hôpital Saint-Louis"
        ],
        nearStations: [
          "Gare du Nord"
        ],
        nearAirports: [
          "Aéroport Charles de Gaulle",
          "Aéroport du Bourget"
        ],
        nearCities: [
          "les-lilas",
          "le-raincy",
          "le-blanc-mesnil",
          "bagnolet",
          "drancy"
        ]
      },
      {
        name: "Les Lilas",
        postalCode: "93260",
        slug: "les-lilas",
        localText: "Taxi conventionné et VSL à Les Lilas (93260) pour vos déplacements médicaux prescrits vers les hôpitaux et cliniques de Seine-Saint-Denis et de Paris.",
        nearHospitals: [
          "Hôpital Bichat",
          "Hôpital Lariboisière"
        ],
        nearStations: [
          "Gare du Nord",
          "Gare de l'Est"
        ],
        nearAirports: [
          "Aéroport Charles de Gaulle",
          "Aéroport du Bourget"
        ],
        nearCities: [
          "bondy",
          "stains",
          "noisy-le-sec",
          "bobigny"
        ]
      },
      {
        name: "Livry-Gargan",
        postalCode: "93190",
        slug: "livry-gargan",
        localText: "Taxi conventionné et VSL à Livry-Gargan (93190) pour vos déplacements médicaux prescrits vers les hôpitaux et cliniques de Seine-Saint-Denis et de Paris.",
        nearHospitals: [
          "Hôpital Bichat",
          "Hôpital Lariboisière",
          "Hôpital Saint-Louis"
        ],
        nearStations: [
          "Gare du Nord"
        ],
        nearAirports: [
          "Aéroport Charles de Gaulle",
          "Aéroport du Bourget"
        ],
        nearCities: [
          "pantin",
          "rosny-sous-bois",
          "coubron",
          "epinay-sur-seine",
          "gournay-sur-marne"
        ]
      },
      {
        name: "Montfermeil",
        postalCode: "93370",
        slug: "montfermeil",
        localText: "Taxi conventionné et VSL à Montfermeil (93370) pour vos déplacements médicaux prescrits vers les hôpitaux et cliniques de Seine-Saint-Denis et de Paris.",
        nearHospitals: [
          "Hôpital Bichat",
          "Hôpital Lariboisière"
        ],
        nearStations: [
          "Gare du Nord"
        ],
        nearAirports: [
          "Aéroport Charles de Gaulle",
          "Aéroport du Bourget"
        ],
        nearCities: [
          "tremblay-en-france",
          "villepinte",
          "vaujours",
          "le-pre-saint-gervais",
          "romainville"
        ]
      },
      {
        name: "Montreuil",
        postalCode: "93100",
        slug: "montreuil",
        localText: "Taxi conventionné et VSL à Montreuil (93100) pour vos déplacements médicaux prescrits vers les hôpitaux et cliniques de Seine-Saint-Denis et de Paris.",
        nearHospitals: [
          "Hôpital Bichat",
          "Hôpital Lariboisière",
          "Hôpital Saint-Louis",
          "Hôpital Robert Debré"
        ],
        nearStations: [
          "Gare du Nord",
          "Gare de l'Est"
        ],
        nearAirports: [
          "Aéroport Charles de Gaulle",
          "Aéroport du Bourget"
        ],
        nearCities: [
          "gagny",
          "villetaneuse",
          "les-lilas"
        ]
      },
      {
        name: "Neuilly-Plaisance",
        postalCode: "93360",
        slug: "neuilly-plaisance",
        localText: "Taxi conventionné et VSL à Neuilly-Plaisance (93360) pour vos déplacements médicaux prescrits vers les hôpitaux et cliniques de Seine-Saint-Denis et de Paris.",
        nearHospitals: [
          "Hôpital Bichat",
          "Hôpital Lariboisière",
          "Hôpital Saint-Louis"
        ],
        nearStations: [
          "Gare du Nord"
        ],
        nearAirports: [
          "Aéroport Charles de Gaulle",
          "Aéroport du Bourget"
        ],
        nearCities: [
          "montfermeil",
          "gagny",
          "bobigny"
        ]
      },
      {
        name: "Neuilly-sur-Marne",
        postalCode: "93330",
        slug: "neuilly-sur-marne",
        localText: "Taxi conventionné et VSL à Neuilly-sur-Marne (93330) pour vos déplacements médicaux prescrits vers les hôpitaux et cliniques de Seine-Saint-Denis et de Paris.",
        nearHospitals: [
          "Hôpital Bichat",
          "Hôpital Lariboisière",
          "Hôpital Saint-Louis"
        ],
        nearStations: [
          "Gare du Nord",
          "Gare de l'Est"
        ],
        nearAirports: [
          "Aéroport Charles de Gaulle",
          "Aéroport du Bourget"
        ],
        nearCities: [
          "bobigny",
          "bagnolet",
          "villetaneuse"
        ]
      },
      {
        name: "Noisy-le-Grand",
        postalCode: "93160",
        slug: "noisy-le-grand",
        localText: "Taxi conventionné et VSL à Noisy-le-Grand (93160) pour vos déplacements médicaux prescrits vers les hôpitaux et cliniques de Seine-Saint-Denis et de Paris.",
        nearHospitals: [
          "Hôpital Bichat",
          "Hôpital Lariboisière",
          "Hôpital Saint-Louis"
        ],
        nearStations: [
          "Gare du Nord",
          "Gare de l'Est"
        ],
        nearAirports: [
          "Aéroport Charles de Gaulle",
          "Aéroport du Bourget"
        ],
        nearCities: [
          "l-ile-saint-denis",
          "les-pavillons-sous-bois",
          "vaujours",
          "gagny",
          "montfermeil"
        ]
      },
      {
        name: "Noisy-le-Sec",
        postalCode: "93130",
        slug: "noisy-le-sec",
        localText: "Taxi conventionné et VSL à Noisy-le-Sec (93130) pour vos déplacements médicaux prescrits vers les hôpitaux et cliniques de Seine-Saint-Denis et de Paris.",
        nearHospitals: [
          "Hôpital Bichat",
          "Hôpital Lariboisière"
        ],
        nearStations: [
          "Gare du Nord",
          "Gare de l'Est"
        ],
        nearAirports: [
          "Aéroport Charles de Gaulle",
          "Aéroport du Bourget"
        ],
        nearCities: [
          "le-pre-saint-gervais",
          "les-lilas",
          "le-bourget",
          "aubervilliers",
          "gagny"
        ]
      },
      {
        name: "Pantin",
        postalCode: "93500",
        slug: "pantin",
        localText: "Taxi conventionné et VSL à Pantin (93500) pour vos déplacements médicaux prescrits vers les hôpitaux et cliniques de Seine-Saint-Denis et de Paris.",
        nearHospitals: [
          "Hôpital Bichat",
          "Hôpital Lariboisière"
        ],
        nearStations: [
          "Gare du Nord",
          "Gare de l'Est"
        ],
        nearAirports: [
          "Aéroport Charles de Gaulle",
          "Aéroport du Bourget"
        ],
        nearCities: [
          "saint-denis",
          "l-ile-saint-denis",
          "aubervilliers",
          "montfermeil",
          "tremblay-en-france"
        ]
      },
      {
        name: "Les Pavillons-sous-Bois",
        postalCode: "93320",
        slug: "les-pavillons-sous-bois",
        localText: "Taxi conventionné et VSL à Les Pavillons-sous-Bois (93320) pour vos déplacements médicaux prescrits vers les hôpitaux et cliniques de Seine-Saint-Denis et de Paris.",
        nearHospitals: [
          "Hôpital Bichat",
          "Hôpital Lariboisière",
          "Hôpital Saint-Louis",
          "Hôpital Robert Debré"
        ],
        nearStations: [
          "Gare du Nord"
        ],
        nearAirports: [
          "Aéroport Charles de Gaulle",
          "Aéroport du Bourget"
        ],
        nearCities: [
          "gagny",
          "bagnolet",
          "neuilly-sur-marne",
          "le-blanc-mesnil",
          "vaujours"
        ]
      },
      {
        name: "Pierrefitte-sur-Seine",
        postalCode: "93380",
        slug: "pierrefitte-sur-seine",
        localText: "Taxi conventionné et VSL à Pierrefitte-sur-Seine (93380) pour vos déplacements médicaux prescrits vers les hôpitaux et cliniques de Seine-Saint-Denis et de Paris.",
        nearHospitals: [
          "Hôpital Bichat",
          "Hôpital Lariboisière"
        ],
        nearStations: [
          "Gare du Nord",
          "Gare de l'Est"
        ],
        nearAirports: [
          "Aéroport Charles de Gaulle",
          "Aéroport du Bourget"
        ],
        nearCities: [
          "clichy-sous-bois",
          "villetaneuse",
          "montreuil"
        ]
      },
      {
        name: "Le Pré-Saint-Gervais",
        postalCode: "93310",
        slug: "le-pre-saint-gervais",
        localText: "Taxi conventionné et VSL à Le Pré-Saint-Gervais (93310) pour vos déplacements médicaux prescrits vers les hôpitaux et cliniques de Seine-Saint-Denis et de Paris.",
        nearHospitals: [
          "Hôpital Bichat",
          "Hôpital Lariboisière",
          "Hôpital Saint-Louis",
          "Hôpital Robert Debré"
        ],
        nearStations: [
          "Gare du Nord",
          "Gare de l'Est"
        ],
        nearAirports: [
          "Aéroport Charles de Gaulle",
          "Aéroport du Bourget"
        ],
        nearCities: [
          "livry-gargan",
          "epinay-sur-seine",
          "drancy"
        ]
      },
      {
        name: "Le Raincy",
        postalCode: "93340",
        slug: "le-raincy",
        localText: "Taxi conventionné et VSL à Le Raincy (93340) pour vos déplacements médicaux prescrits vers les hôpitaux et cliniques de Seine-Saint-Denis et de Paris.",
        nearHospitals: [
          "Hôpital Bichat",
          "Hôpital Lariboisière",
          "Hôpital Saint-Louis"
        ],
        nearStations: [
          "Gare du Nord",
          "Gare de l'Est"
        ],
        nearAirports: [
          "Aéroport Charles de Gaulle",
          "Aéroport du Bourget"
        ],
        nearCities: [
          "la-courneuve",
          "gagny",
          "saint-denis",
          "vaujours",
          "gournay-sur-marne"
        ]
      },
      {
        name: "Romainville",
        postalCode: "93230",
        slug: "romainville",
        localText: "Taxi conventionné et VSL à Romainville (93230) pour vos déplacements médicaux prescrits vers les hôpitaux et cliniques de Seine-Saint-Denis et de Paris.",
        nearHospitals: [
          "Hôpital Bichat",
          "Hôpital Lariboisière"
        ],
        nearStations: [
          "Gare du Nord"
        ],
        nearAirports: [
          "Aéroport Charles de Gaulle",
          "Aéroport du Bourget"
        ],
        nearCities: [
          "sevran",
          "le-raincy",
          "montreuil",
          "montfermeil"
        ]
      },
      {
        name: "Rosny-sous-Bois",
        postalCode: "93110",
        slug: "rosny-sous-bois",
        localText: "Taxi conventionné et VSL à Rosny-sous-Bois (93110) pour vos déplacements médicaux prescrits vers les hôpitaux et cliniques de Seine-Saint-Denis et de Paris.",
        nearHospitals: [
          "Hôpital Bichat",
          "Hôpital Lariboisière",
          "Hôpital Saint-Louis"
        ],
        nearStations: [
          "Gare du Nord",
          "Gare de l'Est"
        ],
        nearAirports: [
          "Aéroport Charles de Gaulle",
          "Aéroport du Bourget"
        ],
        nearCities: [
          "pantin",
          "tremblay-en-france",
          "l-ile-saint-denis",
          "aubervilliers",
          "la-courneuve"
        ]
      },
      {
        name: "Saint-Denis",
        postalCode: "93200",
        slug: "saint-denis",
        localText: "Taxi conventionné et VSL à Saint-Denis (93200) pour vos déplacements médicaux prescrits vers les hôpitaux et cliniques de Seine-Saint-Denis et de Paris.",
        nearHospitals: [
          "Hôpital Bichat",
          "Hôpital Lariboisière"
        ],
        nearStations: [
          "Gare du Nord",
          "Gare de l'Est"
        ],
        nearAirports: [
          "Aéroport Charles de Gaulle",
          "Aéroport du Bourget"
        ],
        nearCities: [
          "neuilly-sur-marne",
          "le-blanc-mesnil",
          "gagny",
          "stains"
        ]
      },
      {
        name: "Saint-Ouen-sur-Seine",
        postalCode: "93400",
        slug: "saint-ouen-sur-seine",
        localText: "Taxi conventionné et VSL à Saint-Ouen-sur-Seine (93400) pour vos déplacements médicaux prescrits vers les hôpitaux et cliniques de Seine-Saint-Denis et de Paris.",
        nearHospitals: [
          "Hôpital Bichat",
          "Hôpital Lariboisière",
          "Hôpital Saint-Louis"
        ],
        nearStations: [
          "Gare du Nord",
          "Gare de l'Est"
        ],
        nearAirports: [
          "Aéroport Charles de Gaulle",
          "Aéroport du Bourget"
        ],
        nearCities: [
          "pierrefitte-sur-seine",
          "saint-denis",
          "aubervilliers"
        ]
      },
      {
        name: "Sevran",
        postalCode: "93270",
        slug: "sevran",
        localText: "Taxi conventionné et VSL à Sevran (93270) pour vos déplacements médicaux prescrits vers les hôpitaux et cliniques de Seine-Saint-Denis et de Paris.",
        nearHospitals: [
          "Hôpital Bichat",
          "Hôpital Lariboisière",
          "Hôpital Saint-Louis"
        ],
        nearStations: [
          "Gare du Nord",
          "Gare de l'Est"
        ],
        nearAirports: [
          "Aéroport Charles de Gaulle",
          "Aéroport du Bourget"
        ],
        nearCities: [
          "aubervilliers",
          "epinay-sur-seine",
          "la-courneuve"
        ]
      },
      {
        name: "Stains",
        postalCode: "93240",
        slug: "stains",
        localText: "Taxi conventionné et VSL à Stains (93240) pour vos déplacements médicaux prescrits vers les hôpitaux et cliniques de Seine-Saint-Denis et de Paris.",
        nearHospitals: [
          "Hôpital Bichat",
          "Hôpital Lariboisière",
          "Hôpital Saint-Louis"
        ],
        nearStations: [
          "Gare du Nord",
          "Gare de l'Est"
        ],
        nearAirports: [
          "Aéroport Charles de Gaulle",
          "Aéroport du Bourget"
        ],
        nearCities: [
          "saint-denis",
          "rosny-sous-bois",
          "tremblay-en-france",
          "le-blanc-mesnil",
          "le-bourget"
        ]
      },
      {
        name: "Tremblay-en-France",
        postalCode: "93290",
        slug: "tremblay-en-france",
        localText: "Taxi conventionné et VSL à Tremblay-en-France (93290) pour vos déplacements médicaux prescrits vers les hôpitaux et cliniques de Seine-Saint-Denis et de Paris.",
        nearHospitals: [
          "Hôpital Bichat",
          "Hôpital Lariboisière",
          "Hôpital Saint-Louis",
          "Hôpital Robert Debré"
        ],
        nearStations: [
          "Gare du Nord",
          "Gare de l'Est"
        ],
        nearAirports: [
          "Aéroport Charles de Gaulle",
          "Aéroport du Bourget"
        ],
        nearCities: [
          "pantin",
          "saint-denis",
          "noisy-le-grand"
        ]
      },
      {
        name: "Vaujours",
        postalCode: "93410",
        slug: "vaujours",
        localText: "Taxi conventionné et VSL à Vaujours (93410) pour vos déplacements médicaux prescrits vers les hôpitaux et cliniques de Seine-Saint-Denis et de Paris.",
        nearHospitals: [
          "Hôpital Bichat",
          "Hôpital Lariboisière"
        ],
        nearStations: [
          "Gare du Nord",
          "Gare de l'Est"
        ],
        nearAirports: [
          "Aéroport Charles de Gaulle",
          "Aéroport du Bourget"
        ],
        nearCities: [
          "aulnay-sous-bois",
          "clichy-sous-bois",
          "noisy-le-sec"
        ]
      },
      {
        name: "Villemomble",
        postalCode: "93250",
        slug: "villemomble",
        localText: "Taxi conventionné et VSL à Villemomble (93250) pour vos déplacements médicaux prescrits vers les hôpitaux et cliniques de Seine-Saint-Denis et de Paris.",
        nearHospitals: [
          "Hôpital Bichat",
          "Hôpital Lariboisière",
          "Hôpital Saint-Louis"
        ],
        nearStations: [
          "Gare du Nord",
          "Gare de l'Est"
        ],
        nearAirports: [
          "Aéroport Charles de Gaulle",
          "Aéroport du Bourget"
        ],
        nearCities: [
          "pantin",
          "pierrefitte-sur-seine",
          "neuilly-sur-marne",
          "tremblay-en-france",
          "le-bourget"
        ]
      },
      {
        name: "Villepinte",
        postalCode: "93420",
        slug: "villepinte",
        localText: "Taxi conventionné et VSL à Villepinte (93420) pour vos déplacements médicaux prescrits vers les hôpitaux et cliniques de Seine-Saint-Denis et de Paris.",
        nearHospitals: [
          "Hôpital Bichat",
          "Hôpital Lariboisière"
        ],
        nearStations: [
          "Gare du Nord",
          "Gare de l'Est"
        ],
        nearAirports: [
          "Aéroport Charles de Gaulle",
          "Aéroport du Bourget"
        ],
        nearCities: [
          "clichy-sous-bois",
          "montfermeil",
          "pierrefitte-sur-seine",
          "le-pre-saint-gervais",
          "villetaneuse"
        ]
      },
      {
        name: "Villetaneuse",
        postalCode: "93430",
        slug: "villetaneuse",
        localText: "Taxi conventionné et VSL à Villetaneuse (93430) pour vos déplacements médicaux prescrits vers les hôpitaux et cliniques de Seine-Saint-Denis et de Paris.",
        nearHospitals: [
          "Hôpital Bichat",
          "Hôpital Lariboisière"
        ],
        nearStations: [
          "Gare du Nord",
          "Gare de l'Est"
        ],
        nearAirports: [
          "Aéroport Charles de Gaulle",
          "Aéroport du Bourget"
        ],
        nearCities: [
          "bagnolet",
          "saint-denis",
          "le-raincy",
          "neuilly-plaisance"
        ]
      }
    ]
  },
  {
    code: "94",
    name: "Val-de-Marne",
    slug: "taxi-conventionne-val-de-marne-94",
    metaTitle: "Taxi conventionné & VSL Val-de-Marne (94) | VSL et transport médical",
    metaDescription: "Taxi conventionné & VSL dans le Val-de-Marne (94). Transport médical assis vers hôpitaux et cliniques, tiers-payant selon prescription.",
    h1: "Taxi conventionné & VSL dans le Val-de-Marne (94)",
    content: "<p>Notre service de taxi conventionné & VSL intervient dans tout le Val-de-Marne (94). Nous assurons vos déplacements médicaux vers Paris et l’Île-de-France.</p>",
    cities: [
      {
        name: "Ablon-sur-Seine",
        postalCode: "94480",
        slug: "ablon-sur-seine",
        localText: "Taxi conventionné et VSL à Ablon-sur-Seine (94480) pour vos déplacements médicaux prescrits vers les hôpitaux et cliniques du Val-de-Marne et de Paris.",
        nearHospitals: [
          "Hôpital Tenon",
          "Hôpital Saint-Antoine",
          "Hôpital Trousseau"
        ],
        nearStations: [
          "Gare de Lyon"
        ],
        nearAirports: [
          "Aéroport Charles de Gaulle"
        ],
        nearCities: [
          "fontenay-sous-bois",
          "maisons-alfort",
          "mandres-les-roses",
          "marolles-en-brie",
          "la-queue-en-brie"
        ]
      },
      {
        name: "Alfortville",
        postalCode: "94140",
        slug: "alfortville",
        localText: "Taxi conventionné et VSL à Alfortville (94140) pour vos déplacements médicaux prescrits vers les hôpitaux et cliniques du Val-de-Marne et de Paris.",
        nearHospitals: [
          "Hôpital Tenon",
          "Hôpital Saint-Antoine",
          "Hôpital Trousseau",
          "Hôpital Rothschild"
        ],
        nearStations: [
          "Gare de Lyon",
          "Gare de l'Est"
        ],
        nearAirports: [
          "Aéroport Charles de Gaulle"
        ],
        nearCities: [
          "ablon-sur-seine",
          "rungis",
          "orly"
        ]
      },
      {
        name: "Arcueil",
        postalCode: "94110",
        slug: "arcueil",
        localText: "Taxi conventionné et VSL à Arcueil (94110) pour vos déplacements médicaux prescrits vers les hôpitaux et cliniques du Val-de-Marne et de Paris.",
        nearHospitals: [
          "Hôpital Tenon",
          "Hôpital Saint-Antoine"
        ],
        nearStations: [
          "Gare de Lyon",
          "Gare de l'Est"
        ],
        nearAirports: [
          "Aéroport Charles de Gaulle"
        ],
        nearCities: [
          "bonneuil-sur-marne",
          "charenton-le-pont",
          "chevilly-larue"
        ]
      },
      {
        name: "Boissy-Saint-Léger",
        postalCode: "94470",
        slug: "boissy-saint-leger",
        localText: "Taxi conventionné et VSL à Boissy-Saint-Léger (94470) pour vos déplacements médicaux prescrits vers les hôpitaux et cliniques du Val-de-Marne et de Paris.",
        nearHospitals: [
          "Hôpital Tenon",
          "Hôpital Saint-Antoine",
          "Hôpital Trousseau"
        ],
        nearStations: [
          "Gare de Lyon",
          "Gare de l'Est"
        ],
        nearAirports: [
          "Aéroport Charles de Gaulle"
        ],
        nearCities: [
          "rungis",
          "arcueil",
          "saint-maurice"
        ]
      },
      {
        name: "Bonneuil-sur-Marne",
        postalCode: "94380",
        slug: "bonneuil-sur-marne",
        localText: "Taxi conventionné et VSL à Bonneuil-sur-Marne (94380) pour vos déplacements médicaux prescrits vers les hôpitaux et cliniques du Val-de-Marne et de Paris.",
        nearHospitals: [
          "Hôpital Tenon",
          "Hôpital Saint-Antoine",
          "Hôpital Trousseau",
          "Hôpital Rothschild"
        ],
        nearStations: [
          "Gare de Lyon",
          "Gare de l'Est"
        ],
        nearAirports: [
          "Aéroport Charles de Gaulle"
        ],
        nearCities: [
          "vitry-sur-seine",
          "arcueil",
          "saint-mande",
          "ablon-sur-seine",
          "villecresnes"
        ]
      },
      {
        name: "Bry-sur-Marne",
        postalCode: "94360",
        slug: "bry-sur-marne",
        localText: "Taxi conventionné et VSL à Bry-sur-Marne (94360) pour vos déplacements médicaux prescrits vers les hôpitaux et cliniques du Val-de-Marne et de Paris.",
        nearHospitals: [
          "Hôpital Tenon",
          "Hôpital Saint-Antoine",
          "Hôpital Trousseau",
          "Hôpital Rothschild"
        ],
        nearStations: [
          "Gare de Lyon"
        ],
        nearAirports: [
          "Aéroport Charles de Gaulle"
        ],
        nearCities: [
          "l-hay-les-roses",
          "le-kremlin-bicetre",
          "mandres-les-roses",
          "alfortville"
        ]
      },
      {
        name: "Cachan",
        postalCode: "94230",
        slug: "cachan",
        localText: "Taxi conventionné et VSL à Cachan (94230) pour vos déplacements médicaux prescrits vers les hôpitaux et cliniques du Val-de-Marne et de Paris.",
        nearHospitals: [
          "Hôpital Tenon",
          "Hôpital Saint-Antoine"
        ],
        nearStations: [
          "Gare de Lyon",
          "Gare de l'Est"
        ],
        nearAirports: [
          "Aéroport Charles de Gaulle"
        ],
        nearCities: [
          "boissy-saint-leger",
          "creteil",
          "l-hay-les-roses",
          "arcueil",
          "champigny-sur-marne"
        ]
      },
      {
        name: "Champigny-sur-Marne",
        postalCode: "94500",
        slug: "champigny-sur-marne",
        localText: "Taxi conventionné et VSL à Champigny-sur-Marne (94500) pour vos déplacements médicaux prescrits vers les hôpitaux et cliniques du Val-de-Marne et de Paris.",
        nearHospitals: [
          "Hôpital Tenon",
          "Hôpital Saint-Antoine"
        ],
        nearStations: [
          "Gare de Lyon",
          "Gare de l'Est"
        ],
        nearAirports: [
          "Aéroport Charles de Gaulle"
        ],
        nearCities: [
          "villeneuve-le-roi",
          "cachan",
          "bry-sur-marne"
        ]
      },
      {
        name: "Charenton-le-Pont",
        postalCode: "94220",
        slug: "charenton-le-pont",
        localText: "Taxi conventionné et VSL à Charenton-le-Pont (94220) pour vos déplacements médicaux prescrits vers les hôpitaux et cliniques du Val-de-Marne et de Paris.",
        nearHospitals: [
          "Hôpital Tenon",
          "Hôpital Saint-Antoine"
        ],
        nearStations: [
          "Gare de Lyon",
          "Gare de l'Est"
        ],
        nearAirports: [
          "Aéroport Charles de Gaulle"
        ],
        nearCities: [
          "thiais",
          "villeneuve-saint-georges",
          "fresnes"
        ]
      },
      {
        name: "Chennevières-sur-Marne",
        postalCode: "94430",
        slug: "chennevieres-sur-marne",
        localText: "Taxi conventionné et VSL à Chennevières-sur-Marne (94430) pour vos déplacements médicaux prescrits vers les hôpitaux et cliniques du Val-de-Marne et de Paris.",
        nearHospitals: [
          "Hôpital Tenon",
          "Hôpital Saint-Antoine",
          "Hôpital Trousseau"
        ],
        nearStations: [
          "Gare de Lyon",
          "Gare de l'Est"
        ],
        nearAirports: [
          "Aéroport Charles de Gaulle"
        ],
        nearCities: [
          "arcueil",
          "gentilly",
          "sucy-en-brie"
        ]
      },
      {
        name: "Chevilly-Larue",
        postalCode: "94550",
        slug: "chevilly-larue",
        localText: "Taxi conventionné et VSL à Chevilly-Larue (94550) pour vos déplacements médicaux prescrits vers les hôpitaux et cliniques du Val-de-Marne et de Paris.",
        nearHospitals: [
          "Hôpital Tenon",
          "Hôpital Saint-Antoine",
          "Hôpital Trousseau",
          "Hôpital Rothschild"
        ],
        nearStations: [
          "Gare de Lyon"
        ],
        nearAirports: [
          "Aéroport Charles de Gaulle"
        ],
        nearCities: [
          "chennevieres-sur-marne",
          "la-queue-en-brie",
          "nogent-sur-marne"
        ]
      },
      {
        name: "Choisy-le-Roi",
        postalCode: "94600",
        slug: "choisy-le-roi",
        localText: "Taxi conventionné et VSL à Choisy-le-Roi (94600) pour vos déplacements médicaux prescrits vers les hôpitaux et cliniques du Val-de-Marne et de Paris.",
        nearHospitals: [
          "Hôpital Tenon",
          "Hôpital Saint-Antoine",
          "Hôpital Trousseau",
          "Hôpital Rothschild"
        ],
        nearStations: [
          "Gare de Lyon"
        ],
        nearAirports: [
          "Aéroport Charles de Gaulle"
        ],
        nearCities: [
          "le-plessis-trevise",
          "villiers-sur-marne",
          "arcueil",
          "fresnes"
        ]
      },
      {
        name: "Créteil",
        postalCode: "94000",
        slug: "creteil",
        localText: "Taxi conventionné et VSL à Créteil (94000) pour vos déplacements médicaux prescrits vers les hôpitaux et cliniques du Val-de-Marne et de Paris.",
        nearHospitals: [
          "Hôpital Tenon",
          "Hôpital Saint-Antoine",
          "Hôpital Trousseau"
        ],
        nearStations: [
          "Gare de Lyon"
        ],
        nearAirports: [
          "Aéroport Charles de Gaulle"
        ],
        nearCities: [
          "gentilly",
          "joinville-le-pont",
          "chevilly-larue",
          "vincennes"
        ]
      },
      {
        name: "Fontenay-sous-Bois",
        postalCode: "94120",
        slug: "fontenay-sous-bois",
        localText: "Taxi conventionné et VSL à Fontenay-sous-Bois (94120) pour vos déplacements médicaux prescrits vers les hôpitaux et cliniques du Val-de-Marne et de Paris.",
        nearHospitals: [
          "Hôpital Tenon",
          "Hôpital Saint-Antoine",
          "Hôpital Trousseau",
          "Hôpital Rothschild"
        ],
        nearStations: [
          "Gare de Lyon"
        ],
        nearAirports: [
          "Aéroport Charles de Gaulle"
        ],
        nearCities: [
          "valenton",
          "alfortville",
          "vitry-sur-seine"
        ]
      },
      {
        name: "Fresnes",
        postalCode: "94260",
        slug: "fresnes",
        localText: "Taxi conventionné et VSL à Fresnes (94260) pour vos déplacements médicaux prescrits vers les hôpitaux et cliniques du Val-de-Marne et de Paris.",
        nearHospitals: [
          "Hôpital Tenon",
          "Hôpital Saint-Antoine"
        ],
        nearStations: [
          "Gare de Lyon",
          "Gare de l'Est"
        ],
        nearAirports: [
          "Aéroport Charles de Gaulle"
        ],
        nearCities: [
          "vitry-sur-seine",
          "l-hay-les-roses",
          "mandres-les-roses",
          "joinville-le-pont",
          "bry-sur-marne"
        ]
      },
      {
        name: "Gentilly",
        postalCode: "94250",
        slug: "gentilly",
        localText: "Taxi conventionné et VSL à Gentilly (94250) pour vos déplacements médicaux prescrits vers les hôpitaux et cliniques du Val-de-Marne et de Paris.",
        nearHospitals: [
          "Hôpital Tenon",
          "Hôpital Saint-Antoine",
          "Hôpital Trousseau"
        ],
        nearStations: [
          "Gare de Lyon"
        ],
        nearAirports: [
          "Aéroport Charles de Gaulle"
        ],
        nearCities: [
          "bonneuil-sur-marne",
          "noiseau",
          "cachan",
          "l-hay-les-roses"
        ]
      },
      {
        name: "L'Haÿ-les-Roses",
        postalCode: "94240",
        slug: "l-hay-les-roses",
        localText: "Taxi conventionné et VSL à L'Haÿ-les-Roses (94240) pour vos déplacements médicaux prescrits vers les hôpitaux et cliniques du Val-de-Marne et de Paris.",
        nearHospitals: [
          "Hôpital Tenon",
          "Hôpital Saint-Antoine",
          "Hôpital Trousseau"
        ],
        nearStations: [
          "Gare de Lyon",
          "Gare de l'Est"
        ],
        nearAirports: [
          "Aéroport Charles de Gaulle"
        ],
        nearCities: [
          "perigny",
          "arcueil",
          "villecresnes",
          "alfortville",
          "nogent-sur-marne"
        ]
      },
      {
        name: "Ivry-sur-Seine",
        postalCode: "94200",
        slug: "ivry-sur-seine",
        localText: "Taxi conventionné et VSL à Ivry-sur-Seine (94200) pour vos déplacements médicaux prescrits vers les hôpitaux et cliniques du Val-de-Marne et de Paris.",
        nearHospitals: [
          "Hôpital Tenon",
          "Hôpital Saint-Antoine",
          "Hôpital Trousseau",
          "Hôpital Rothschild"
        ],
        nearStations: [
          "Gare de Lyon",
          "Gare de l'Est"
        ],
        nearAirports: [
          "Aéroport Charles de Gaulle"
        ],
        nearCities: [
          "arcueil",
          "alfortville",
          "charenton-le-pont"
        ]
      },
      {
        name: "Joinville-le-Pont",
        postalCode: "94340",
        slug: "joinville-le-pont",
        localText: "Taxi conventionné et VSL à Joinville-le-Pont (94340) pour vos déplacements médicaux prescrits vers les hôpitaux et cliniques du Val-de-Marne et de Paris.",
        nearHospitals: [
          "Hôpital Tenon",
          "Hôpital Saint-Antoine",
          "Hôpital Trousseau",
          "Hôpital Rothschild"
        ],
        nearStations: [
          "Gare de Lyon",
          "Gare de l'Est"
        ],
        nearAirports: [
          "Aéroport Charles de Gaulle"
        ],
        nearCities: [
          "villecresnes",
          "l-hay-les-roses",
          "vitry-sur-seine",
          "ablon-sur-seine",
          "limeil-brevannes"
        ]
      },
      {
        name: "Le Kremlin-Bicêtre",
        postalCode: "94270",
        slug: "le-kremlin-bicetre",
        localText: "Taxi conventionné et VSL à Le Kremlin-Bicêtre (94270) pour vos déplacements médicaux prescrits vers les hôpitaux et cliniques du Val-de-Marne et de Paris.",
        nearHospitals: [
          "Hôpital Tenon",
          "Hôpital Saint-Antoine",
          "Hôpital Trousseau",
          "Hôpital Rothschild"
        ],
        nearStations: [
          "Gare de Lyon"
        ],
        nearAirports: [
          "Aéroport Charles de Gaulle"
        ],
        nearCities: [
          "maisons-alfort",
          "mandres-les-roses",
          "ivry-sur-seine",
          "bry-sur-marne",
          "perigny"
        ]
      },
      {
        name: "Limeil-Brévannes",
        postalCode: "94450",
        slug: "limeil-brevannes",
        localText: "Taxi conventionné et VSL à Limeil-Brévannes (94450) pour vos déplacements médicaux prescrits vers les hôpitaux et cliniques du Val-de-Marne et de Paris.",
        nearHospitals: [
          "Hôpital Tenon",
          "Hôpital Saint-Antoine"
        ],
        nearStations: [
          "Gare de Lyon",
          "Gare de l'Est"
        ],
        nearAirports: [
          "Aéroport Charles de Gaulle"
        ],
        nearCities: [
          "sucy-en-brie",
          "chevilly-larue",
          "thiais",
          "le-plessis-trevise",
          "cachan"
        ]
      },
      {
        name: "Maisons-Alfort",
        postalCode: "94700",
        slug: "maisons-alfort",
        localText: "Taxi conventionné et VSL à Maisons-Alfort (94700) pour vos déplacements médicaux prescrits vers les hôpitaux et cliniques du Val-de-Marne et de Paris.",
        nearHospitals: [
          "Hôpital Tenon",
          "Hôpital Saint-Antoine"
        ],
        nearStations: [
          "Gare de Lyon",
          "Gare de l'Est"
        ],
        nearAirports: [
          "Aéroport Charles de Gaulle"
        ],
        nearCities: [
          "le-plessis-trevise",
          "bry-sur-marne",
          "vitry-sur-seine"
        ]
      },
      {
        name: "Mandres-les-Roses",
        postalCode: "94520",
        slug: "mandres-les-roses",
        localText: "Taxi conventionné et VSL à Mandres-les-Roses (94520) pour vos déplacements médicaux prescrits vers les hôpitaux et cliniques du Val-de-Marne et de Paris.",
        nearHospitals: [
          "Hôpital Tenon",
          "Hôpital Saint-Antoine",
          "Hôpital Trousseau",
          "Hôpital Rothschild"
        ],
        nearStations: [
          "Gare de Lyon",
          "Gare de l'Est"
        ],
        nearAirports: [
          "Aéroport Charles de Gaulle"
        ],
        nearCities: [
          "vincennes",
          "ablon-sur-seine",
          "alfortville",
          "villecresnes",
          "ormesson-sur-marne"
        ]
      },
      {
        name: "Marolles-en-Brie",
        postalCode: "94440",
        slug: "marolles-en-brie",
        localText: "Taxi conventionné et VSL à Marolles-en-Brie (94440) pour vos déplacements médicaux prescrits vers les hôpitaux et cliniques du Val-de-Marne et de Paris.",
        nearHospitals: [
          "Hôpital Tenon",
          "Hôpital Saint-Antoine",
          "Hôpital Trousseau",
          "Hôpital Rothschild"
        ],
        nearStations: [
          "Gare de Lyon",
          "Gare de l'Est"
        ],
        nearAirports: [
          "Aéroport Charles de Gaulle"
        ],
        nearCities: [
          "chevilly-larue",
          "l-hay-les-roses",
          "noiseau",
          "saint-maur-des-fosses",
          "villiers-sur-marne"
        ]
      },
      {
        name: "Nogent-sur-Marne",
        postalCode: "94130",
        slug: "nogent-sur-marne",
        localText: "Taxi conventionné et VSL à Nogent-sur-Marne (94130) pour vos déplacements médicaux prescrits vers les hôpitaux et cliniques du Val-de-Marne et de Paris.",
        nearHospitals: [
          "Hôpital Tenon",
          "Hôpital Saint-Antoine"
        ],
        nearStations: [
          "Gare de Lyon",
          "Gare de l'Est"
        ],
        nearAirports: [
          "Aéroport Charles de Gaulle"
        ],
        nearCities: [
          "la-queue-en-brie",
          "ivry-sur-seine",
          "vincennes"
        ]
      },
      {
        name: "Noiseau",
        postalCode: "94880",
        slug: "noiseau",
        localText: "Taxi conventionné et VSL à Noiseau (94880) pour vos déplacements médicaux prescrits vers les hôpitaux et cliniques du Val-de-Marne et de Paris.",
        nearHospitals: [
          "Hôpital Tenon",
          "Hôpital Saint-Antoine",
          "Hôpital Trousseau"
        ],
        nearStations: [
          "Gare de Lyon",
          "Gare de l'Est"
        ],
        nearAirports: [
          "Aéroport Charles de Gaulle"
        ],
        nearCities: [
          "villeneuve-saint-georges",
          "villejuif",
          "vitry-sur-seine"
        ]
      },
      {
        name: "Orly",
        postalCode: "94310",
        slug: "orly",
        localText: "Taxi conventionné et VSL à Orly (94310) pour vos déplacements médicaux prescrits vers les hôpitaux et cliniques du Val-de-Marne et de Paris.",
        nearHospitals: [
          "Hôpital Tenon",
          "Hôpital Saint-Antoine",
          "Hôpital Trousseau",
          "Hôpital Rothschild"
        ],
        nearStations: [
          "Gare de Lyon",
          "Gare de l'Est"
        ],
        nearAirports: [
          "Aéroport Charles de Gaulle"
        ],
        nearCities: [
          "marolles-en-brie",
          "ormesson-sur-marne",
          "le-plessis-trevise"
        ]
      },
      {
        name: "Ormesson-sur-Marne",
        postalCode: "94490",
        slug: "ormesson-sur-marne",
        localText: "Taxi conventionné et VSL à Ormesson-sur-Marne (94490) pour vos déplacements médicaux prescrits vers les hôpitaux et cliniques du Val-de-Marne et de Paris.",
        nearHospitals: [
          "Hôpital Tenon",
          "Hôpital Saint-Antoine",
          "Hôpital Trousseau",
          "Hôpital Rothschild"
        ],
        nearStations: [
          "Gare de Lyon",
          "Gare de l'Est"
        ],
        nearAirports: [
          "Aéroport Charles de Gaulle"
        ],
        nearCities: [
          "la-queue-en-brie",
          "bonneuil-sur-marne",
          "noiseau",
          "le-plessis-trevise",
          "arcueil"
        ]
      },
      {
        name: "Périgny",
        postalCode: "94520",
        slug: "perigny",
        localText: "Taxi conventionné et VSL à Périgny (94520) pour vos déplacements médicaux prescrits vers les hôpitaux et cliniques du Val-de-Marne et de Paris.",
        nearHospitals: [
          "Hôpital Tenon",
          "Hôpital Saint-Antoine",
          "Hôpital Trousseau",
          "Hôpital Rothschild"
        ],
        nearStations: [
          "Gare de Lyon",
          "Gare de l'Est"
        ],
        nearAirports: [
          "Aéroport Charles de Gaulle"
        ],
        nearCities: [
          "bonneuil-sur-marne",
          "gentilly",
          "le-kremlin-bicetre"
        ]
      },
      {
        name: "Le Perreux-sur-Marne",
        postalCode: "94170",
        slug: "le-perreux-sur-marne",
        localText: "Taxi conventionné et VSL à Le Perreux-sur-Marne (94170) pour vos déplacements médicaux prescrits vers les hôpitaux et cliniques du Val-de-Marne et de Paris.",
        nearHospitals: [
          "Hôpital Tenon",
          "Hôpital Saint-Antoine",
          "Hôpital Trousseau"
        ],
        nearStations: [
          "Gare de Lyon",
          "Gare de l'Est"
        ],
        nearAirports: [
          "Aéroport Charles de Gaulle"
        ],
        nearCities: [
          "la-queue-en-brie",
          "charenton-le-pont",
          "santeny"
        ]
      },
      {
        name: "Le Plessis-Trévise",
        postalCode: "94420",
        slug: "le-plessis-trevise",
        localText: "Taxi conventionné et VSL à Le Plessis-Trévise (94420) pour vos déplacements médicaux prescrits vers les hôpitaux et cliniques du Val-de-Marne et de Paris.",
        nearHospitals: [
          "Hôpital Tenon",
          "Hôpital Saint-Antoine",
          "Hôpital Trousseau"
        ],
        nearStations: [
          "Gare de Lyon"
        ],
        nearAirports: [
          "Aéroport Charles de Gaulle"
        ],
        nearCities: [
          "ormesson-sur-marne",
          "mandres-les-roses",
          "l-hay-les-roses",
          "fresnes"
        ]
      },
      {
        name: "La Queue-en-Brie",
        postalCode: "94510",
        slug: "la-queue-en-brie",
        localText: "Taxi conventionné et VSL à La Queue-en-Brie (94510) pour vos déplacements médicaux prescrits vers les hôpitaux et cliniques du Val-de-Marne et de Paris.",
        nearHospitals: [
          "Hôpital Tenon",
          "Hôpital Saint-Antoine"
        ],
        nearStations: [
          "Gare de Lyon",
          "Gare de l'Est"
        ],
        nearAirports: [
          "Aéroport Charles de Gaulle"
        ],
        nearCities: [
          "fresnes",
          "mandres-les-roses",
          "limeil-brevannes",
          "le-perreux-sur-marne"
        ]
      },
      {
        name: "Rungis",
        postalCode: "94150",
        slug: "rungis",
        localText: "Taxi conventionné et VSL à Rungis (94150) pour vos déplacements médicaux prescrits vers les hôpitaux et cliniques du Val-de-Marne et de Paris.",
        nearHospitals: [
          "Hôpital Tenon",
          "Hôpital Saint-Antoine"
        ],
        nearStations: [
          "Gare de Lyon"
        ],
        nearAirports: [
          "Aéroport Charles de Gaulle"
        ],
        nearCities: [
          "santeny",
          "perigny",
          "thiais"
        ]
      },
      {
        name: "Saint-Mandé",
        postalCode: "94160",
        slug: "saint-mande",
        localText: "Taxi conventionné et VSL à Saint-Mandé (94160) pour vos déplacements médicaux prescrits vers les hôpitaux et cliniques du Val-de-Marne et de Paris.",
        nearHospitals: [
          "Hôpital Tenon",
          "Hôpital Saint-Antoine"
        ],
        nearStations: [
          "Gare de Lyon"
        ],
        nearAirports: [
          "Aéroport Charles de Gaulle"
        ],
        nearCities: [
          "ablon-sur-seine",
          "arcueil",
          "fontenay-sous-bois",
          "villeneuve-le-roi"
        ]
      },
      {
        name: "Saint-Maur-des-Fossés",
        postalCode: "94100",
        slug: "saint-maur-des-fosses",
        localText: "Taxi conventionné et VSL à Saint-Maur-des-Fossés (94100) pour vos déplacements médicaux prescrits vers les hôpitaux et cliniques du Val-de-Marne et de Paris.",
        nearHospitals: [
          "Hôpital Tenon",
          "Hôpital Saint-Antoine",
          "Hôpital Trousseau",
          "Hôpital Rothschild"
        ],
        nearStations: [
          "Gare de Lyon"
        ],
        nearAirports: [
          "Aéroport Charles de Gaulle"
        ],
        nearCities: [
          "cachan",
          "arcueil",
          "villeneuve-saint-georges",
          "saint-maurice"
        ]
      },
      {
        name: "Saint-Maurice",
        postalCode: "94410",
        slug: "saint-maurice",
        localText: "Taxi conventionné et VSL à Saint-Maurice (94410) pour vos déplacements médicaux prescrits vers les hôpitaux et cliniques du Val-de-Marne et de Paris.",
        nearHospitals: [
          "Hôpital Tenon",
          "Hôpital Saint-Antoine"
        ],
        nearStations: [
          "Gare de Lyon",
          "Gare de l'Est"
        ],
        nearAirports: [
          "Aéroport Charles de Gaulle"
        ],
        nearCities: [
          "santeny",
          "ablon-sur-seine",
          "alfortville",
          "orly",
          "chennevieres-sur-marne"
        ]
      },
      {
        name: "Santeny",
        postalCode: "94440",
        slug: "santeny",
        localText: "Taxi conventionné et VSL à Santeny (94440) pour vos déplacements médicaux prescrits vers les hôpitaux et cliniques du Val-de-Marne et de Paris.",
        nearHospitals: [
          "Hôpital Tenon",
          "Hôpital Saint-Antoine",
          "Hôpital Trousseau",
          "Hôpital Rothschild"
        ],
        nearStations: [
          "Gare de Lyon",
          "Gare de l'Est"
        ],
        nearAirports: [
          "Aéroport Charles de Gaulle"
        ],
        nearCities: [
          "bonneuil-sur-marne",
          "chennevieres-sur-marne",
          "fontenay-sous-bois"
        ]
      },
      {
        name: "Sucy-en-Brie",
        postalCode: "94370",
        slug: "sucy-en-brie",
        localText: "Taxi conventionné et VSL à Sucy-en-Brie (94370) pour vos déplacements médicaux prescrits vers les hôpitaux et cliniques du Val-de-Marne et de Paris.",
        nearHospitals: [
          "Hôpital Tenon",
          "Hôpital Saint-Antoine",
          "Hôpital Trousseau",
          "Hôpital Rothschild"
        ],
        nearStations: [
          "Gare de Lyon"
        ],
        nearAirports: [
          "Aéroport Charles de Gaulle"
        ],
        nearCities: [
          "mandres-les-roses",
          "ivry-sur-seine",
          "villejuif"
        ]
      },
      {
        name: "Thiais",
        postalCode: "94320",
        slug: "thiais",
        localText: "Taxi conventionné et VSL à Thiais (94320) pour vos déplacements médicaux prescrits vers les hôpitaux et cliniques du Val-de-Marne et de Paris.",
        nearHospitals: [
          "Hôpital Tenon",
          "Hôpital Saint-Antoine",
          "Hôpital Trousseau",
          "Hôpital Rothschild"
        ],
        nearStations: [
          "Gare de Lyon"
        ],
        nearAirports: [
          "Aéroport Charles de Gaulle"
        ],
        nearCities: [
          "maisons-alfort",
          "cachan",
          "chennevieres-sur-marne",
          "saint-maurice"
        ]
      },
      {
        name: "Valenton",
        postalCode: "94460",
        slug: "valenton",
        localText: "Taxi conventionné et VSL à Valenton (94460) pour vos déplacements médicaux prescrits vers les hôpitaux et cliniques du Val-de-Marne et de Paris.",
        nearHospitals: [
          "Hôpital Tenon",
          "Hôpital Saint-Antoine",
          "Hôpital Trousseau"
        ],
        nearStations: [
          "Gare de Lyon",
          "Gare de l'Est"
        ],
        nearAirports: [
          "Aéroport Charles de Gaulle"
        ],
        nearCities: [
          "ablon-sur-seine",
          "le-kremlin-bicetre",
          "l-hay-les-roses",
          "villeneuve-le-roi"
        ]
      },
      {
        name: "Villecresnes",
        postalCode: "94440",
        slug: "villecresnes",
        localText: "Taxi conventionné et VSL à Villecresnes (94440) pour vos déplacements médicaux prescrits vers les hôpitaux et cliniques du Val-de-Marne et de Paris.",
        nearHospitals: [
          "Hôpital Tenon",
          "Hôpital Saint-Antoine",
          "Hôpital Trousseau"
        ],
        nearStations: [
          "Gare de Lyon",
          "Gare de l'Est"
        ],
        nearAirports: [
          "Aéroport Charles de Gaulle"
        ],
        nearCities: [
          "vincennes",
          "arcueil",
          "fontenay-sous-bois",
          "alfortville"
        ]
      },
      {
        name: "Villejuif",
        postalCode: "94800",
        slug: "villejuif",
        localText: "Taxi conventionné et VSL à Villejuif (94800) pour vos déplacements médicaux prescrits vers les hôpitaux et cliniques du Val-de-Marne et de Paris.",
        nearHospitals: [
          "Hôpital Tenon",
          "Hôpital Saint-Antoine"
        ],
        nearStations: [
          "Gare de Lyon",
          "Gare de l'Est"
        ],
        nearAirports: [
          "Aéroport Charles de Gaulle"
        ],
        nearCities: [
          "charenton-le-pont",
          "ormesson-sur-marne",
          "gentilly",
          "marolles-en-brie"
        ]
      },
      {
        name: "Villeneuve-le-Roi",
        postalCode: "94290",
        slug: "villeneuve-le-roi",
        localText: "Taxi conventionné et VSL à Villeneuve-le-Roi (94290) pour vos déplacements médicaux prescrits vers les hôpitaux et cliniques du Val-de-Marne et de Paris.",
        nearHospitals: [
          "Hôpital Tenon",
          "Hôpital Saint-Antoine"
        ],
        nearStations: [
          "Gare de Lyon"
        ],
        nearAirports: [
          "Aéroport Charles de Gaulle"
        ],
        nearCities: [
          "fresnes",
          "orly",
          "marolles-en-brie",
          "chennevieres-sur-marne",
          "perigny"
        ]
      },
      {
        name: "Villeneuve-Saint-Georges",
        postalCode: "94190",
        slug: "villeneuve-saint-georges",
        localText: "Taxi conventionné et VSL à Villeneuve-Saint-Georges (94190) pour vos déplacements médicaux prescrits vers les hôpitaux et cliniques du Val-de-Marne et de Paris.",
        nearHospitals: [
          "Hôpital Tenon",
          "Hôpital Saint-Antoine",
          "Hôpital Trousseau"
        ],
        nearStations: [
          "Gare de Lyon",
          "Gare de l'Est"
        ],
        nearAirports: [
          "Aéroport Charles de Gaulle"
        ],
        nearCities: [
          "vitry-sur-seine",
          "chennevieres-sur-marne",
          "marolles-en-brie"
        ]
      },
      {
        name: "Villiers-sur-Marne",
        postalCode: "94350",
        slug: "villiers-sur-marne",
        localText: "Taxi conventionné et VSL à Villiers-sur-Marne (94350) pour vos déplacements médicaux prescrits vers les hôpitaux et cliniques du Val-de-Marne et de Paris.",
        nearHospitals: [
          "Hôpital Tenon",
          "Hôpital Saint-Antoine",
          "Hôpital Trousseau",
          "Hôpital Rothschild"
        ],
        nearStations: [
          "Gare de Lyon"
        ],
        nearAirports: [
          "Aéroport Charles de Gaulle"
        ],
        nearCities: [
          "saint-maur-des-fosses",
          "marolles-en-brie",
          "creteil"
        ]
      },
      {
        name: "Vincennes",
        postalCode: "94300",
        slug: "vincennes",
        localText: "Taxi conventionné et VSL à Vincennes (94300) pour vos déplacements médicaux prescrits vers les hôpitaux et cliniques du Val-de-Marne et de Paris.",
        nearHospitals: [
          "Hôpital Tenon",
          "Hôpital Saint-Antoine",
          "Hôpital Trousseau"
        ],
        nearStations: [
          "Gare de Lyon",
          "Gare de l'Est"
        ],
        nearAirports: [
          "Aéroport Charles de Gaulle"
        ],
        nearCities: [
          "choisy-le-roi",
          "creteil",
          "mandres-les-roses",
          "noiseau"
        ]
      },
      {
        name: "Vitry-sur-Seine",
        postalCode: "94400",
        slug: "vitry-sur-seine",
        localText: "Taxi conventionné et VSL à Vitry-sur-Seine (94400) pour vos déplacements médicaux prescrits vers les hôpitaux et cliniques du Val-de-Marne et de Paris.",
        nearHospitals: [
          "Hôpital Tenon",
          "Hôpital Saint-Antoine"
        ],
        nearStations: [
          "Gare de Lyon",
          "Gare de l'Est"
        ],
        nearAirports: [
          "Aéroport Charles de Gaulle"
        ],
        nearCities: [
          "perigny",
          "boissy-saint-leger",
          "alfortville",
          "fresnes"
        ]
      }
    ]
  }
];
const citiesData = {
  departments
};
const services = [
  "Transport vers hôpitaux et cliniques",
  "Consultations médicales spécialisées",
  "Dialyse et chimiothérapie",
  "Transport ALD (Affections Longue Durée)",
  "Chirurgie ambulatoire",
  "Radiothérapie et traitements"
];
const PREPOSITION = {
  "75": "à",
  "91": "en",
  "92": "dans les",
  "93": "en",
  "94": "dans le"
};
function DepartmentPage({ department, onNavigate }) {
  const deptData = citiesData.departments.find((d) => d.code === department);
  const seo = departmentsSEO[department];
  if (!deptData || !seo) {
    return /* @__PURE__ */ jsx("div", { className: "py-12 bg-gray-50", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-4 text-center", children: [
      /* @__PURE__ */ jsx("h1", { className: "text-3xl font-bold text-gray-800 mb-4", children: "Département non trouvé" }),
      /* @__PURE__ */ jsx(
        Link,
        {
          to: "/",
          className: "bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition inline-block",
          children: "Retour à l'accueil"
        }
      )
    ] }) });
  }
  const topCities = deptData.cities.slice(0, 10);
  const remainingCities = deptData.cities.slice(10);
  const prep = PREPOSITION[department] || "en";
  const jsonLD = [
    generateJsonLD(department),
    generateBreadcrumbList([
      { name: "Accueil", url: "/" },
      { name: `Taxi VSL ${deptData.name}`, url: `/${deptData.slug}` }
    ])
  ];
  return /* @__PURE__ */ jsx("div", { className: "relative", children: /* @__PURE__ */ jsxs("div", { className: "relative z-10 bg-gray-50", children: [
    /* @__PURE__ */ jsx(
      SEOHead,
      {
        title: seo.metaTitle,
        description: seo.metaDescription,
        keywords: seo.keywords,
        jsonLD
      }
    ),
    /* @__PURE__ */ jsxs("section", { className: "relative min-h-[500px] flex items-center overflow-hidden", children: [
      /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-br from-blue-600 via-blue-700 to-blue-900" }),
      /* @__PURE__ */ jsx(
        "div",
        {
          className: "absolute inset-0 opacity-20",
          style: {
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }
        }
      ),
      /* @__PURE__ */ jsx("div", { className: "container mx-auto px-4 relative z-10", children: /* @__PURE__ */ jsxs("div", { className: "max-w-4xl mx-auto text-center text-white", children: [
        /* @__PURE__ */ jsx("h1", { className: "text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight", children: seo.h1 }),
        /* @__PURE__ */ jsx("p", { className: "text-xl md:text-2xl mb-8 text-blue-100 leading-relaxed", children: seo.metaDescription }),
        /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap justify-center gap-4", children: [
          /* @__PURE__ */ jsxs(
            Link,
            {
              to: "/reservation-taxi-vsl/",
              className: "group bg-white text-blue-600 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-blue-50 transition-all shadow-xl hover:shadow-2xl hover:scale-105 inline-flex items-center gap-2 focus:outline-none focus:ring-4 focus:ring-blue-300 active:scale-95",
              children: [
                /* @__PURE__ */ jsx(Calendar, { size: 20, "aria-hidden": "true" }),
                "Réserver maintenant",
                /* @__PURE__ */ jsx(ArrowRight, { className: "group-hover:translate-x-1 transition-transform", size: 18, "aria-hidden": "true" })
              ]
            }
          ),
          /* @__PURE__ */ jsxs(
            "a",
            {
              href: "tel:+33650366491",
              className: "bg-transparent border-2 border-white text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-white hover:text-blue-600 transition-all inline-flex items-center gap-2",
              children: [
                /* @__PURE__ */ jsx(Phone, { size: 20, "aria-hidden": "true" }),
                "06 50 36 64 91"
              ]
            }
          )
        ] })
      ] }) }),
      /* @__PURE__ */ jsx("div", { className: "absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-gray-50 to-transparent" })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "py-12", children: /* @__PURE__ */ jsx("div", { className: "container mx-auto px-4", children: /* @__PURE__ */ jsxs("div", { className: "max-w-6xl mx-auto", children: [
      /* @__PURE__ */ jsxs("div", { className: "grid md:grid-cols-3 gap-6 mb-12", children: [
        /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-2xl shadow-lg p-6 text-center border border-gray-100", children: [
          /* @__PURE__ */ jsx("div", { className: "bg-blue-100 w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-3", children: /* @__PURE__ */ jsx(Shield, { className: "text-blue-600", size: 28 }) }),
          /* @__PURE__ */ jsx("h3", { className: "font-bold text-gray-800 mb-1", children: "Agréé CPAM" }),
          /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-600", children: "Transport 100% remboursé sur prescription" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-2xl shadow-lg p-6 text-center border border-gray-100", children: [
          /* @__PURE__ */ jsx("div", { className: "bg-orange-100 w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-3", children: /* @__PURE__ */ jsx(Clock, { className: "text-orange-500", size: 28 }) }),
          /* @__PURE__ */ jsx("h3", { className: "font-bold text-gray-800 mb-1", children: "Disponible 24h/24" }),
          /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-600", children: "7j/7, jours fériés compris" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-2xl shadow-lg p-6 text-center border border-gray-100", children: [
          /* @__PURE__ */ jsx("div", { className: "bg-green-100 w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-3", children: /* @__PURE__ */ jsx(MapPin, { className: "text-green-600", size: 28 }) }),
          /* @__PURE__ */ jsx("h3", { className: "font-bold text-gray-800 mb-1", children: "Porte à porte" }),
          /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-600", children: "Prise en charge à domicile" })
        ] })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "bg-white rounded-2xl shadow-lg p-8 mb-12 border border-gray-100", children: /* @__PURE__ */ jsx("p", { className: "text-gray-700 leading-relaxed text-lg", children: seo.uniqueParagraph }) }),
      /* @__PURE__ */ jsxs("div", { className: "grid md:grid-cols-2 gap-8 mb-12", children: [
        /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-2xl shadow-xl p-8 border border-gray-100 hover:shadow-2xl transition-shadow", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 mb-6", children: [
            /* @__PURE__ */ jsx("div", { className: "bg-gradient-to-br from-blue-500 to-blue-600 p-3 rounded-xl", children: /* @__PURE__ */ jsx(Stethoscope, { className: "text-white", size: 28 }) }),
            /* @__PURE__ */ jsx("h2", { className: "text-2xl font-bold text-gray-800", children: "Hôpitaux desservis" })
          ] }),
          /* @__PURE__ */ jsx("ul", { className: "space-y-3", children: seo.hospitals.map((hospital, index) => /* @__PURE__ */ jsxs("li", { className: "flex items-start gap-3 text-gray-700", children: [
            /* @__PURE__ */ jsx(CheckCircle, { className: "text-green-500 flex-shrink-0 mt-0.5", size: 18 }),
            /* @__PURE__ */ jsx("span", { className: "text-sm font-medium", children: hospital })
          ] }, index)) })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-2xl shadow-xl p-8 border border-gray-100 hover:shadow-2xl transition-shadow", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 mb-6", children: [
            /* @__PURE__ */ jsx("div", { className: "bg-gradient-to-br from-green-500 to-green-600 p-3 rounded-xl", children: /* @__PURE__ */ jsx(Shield, { className: "text-white", size: 28 }) }),
            /* @__PURE__ */ jsx("h2", { className: "text-2xl font-bold text-gray-800", children: "Nos services" })
          ] }),
          /* @__PURE__ */ jsx("ul", { className: "space-y-3", children: services.map((service, index) => /* @__PURE__ */ jsxs("li", { className: "flex items-center gap-3 text-gray-700", children: [
            /* @__PURE__ */ jsx(CheckCircle, { className: "text-green-500 flex-shrink-0", size: 18 }),
            /* @__PURE__ */ jsx("span", { className: "font-medium", children: service })
          ] }, index)) })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-2xl shadow-xl p-8 mb-12", children: [
        /* @__PURE__ */ jsxs("h2", { className: "text-2xl font-bold text-gray-800 mb-2 text-center", children: [
          "Villes desservies ",
          prep,
          " ",
          deptData.name,
          " (",
          department,
          ")"
        ] }),
        /* @__PURE__ */ jsx("p", { className: "text-gray-600 mb-6 text-center text-sm", children: "Cliquez sur votre ville pour plus d'informations sur nos services de taxi VSL conventionné" }),
        /* @__PURE__ */ jsx("div", { className: "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 mb-4", children: topCities.map((city, index) => /* @__PURE__ */ jsxs(
          Link,
          {
            to: `/${deptData.slug}/${city.slug}`,
            className: "flex items-center gap-2 bg-blue-50 hover:bg-blue-600 hover:text-white text-gray-700 px-4 py-3 rounded-lg transition-all border border-blue-200 hover:border-blue-600 group",
            children: [
              /* @__PURE__ */ jsx(MapPin, { size: 14, className: "flex-shrink-0 text-blue-600 group-hover:text-white" }),
              /* @__PURE__ */ jsx("span", { className: "text-sm font-medium truncate", children: city.name })
            ]
          },
          index
        )) }),
        remainingCities.length > 0 && /* @__PURE__ */ jsx("div", { className: "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3", children: remainingCities.map((city, index) => /* @__PURE__ */ jsxs(
          Link,
          {
            to: `/${deptData.slug}/${city.slug}`,
            className: "flex items-center gap-2 bg-gray-50 hover:bg-gray-100 text-gray-600 px-4 py-3 rounded-lg transition-all border border-gray-200 group",
            children: [
              /* @__PURE__ */ jsx(MapPin, { size: 14, className: "flex-shrink-0 text-gray-400 group-hover:text-blue-500" }),
              /* @__PURE__ */ jsx("span", { className: "text-sm truncate", children: city.name })
            ]
          },
          index
        )) })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-2xl shadow-xl p-8 mb-12", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 mb-8", children: [
          /* @__PURE__ */ jsx("div", { className: "bg-gradient-to-br from-blue-500 to-blue-600 p-3 rounded-xl", children: /* @__PURE__ */ jsx(HelpCircle, { className: "text-white", size: 28 }) }),
          /* @__PURE__ */ jsxs("h2", { className: "text-2xl font-bold text-gray-800", children: [
            "Questions fréquentes – Taxi conventionné ",
            prep,
            " ",
            deptData.name
          ] })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "space-y-6", children: seo.faq.map((item, index) => /* @__PURE__ */ jsxs("div", { className: "border-b border-gray-100 pb-6 last:border-0 last:pb-0", children: [
          /* @__PURE__ */ jsxs("h3", { className: "font-semibold text-gray-800 mb-2 flex items-start gap-2", children: [
            /* @__PURE__ */ jsx("span", { className: "bg-blue-100 text-blue-600 rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5", children: index + 1 }),
            item.q
          ] }),
          /* @__PURE__ */ jsx("p", { className: "text-gray-600 leading-relaxed pl-8", children: item.a })
        ] }, index)) })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "bg-gray-50 border border-gray-200 rounded-2xl p-8 mb-12", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-2xl font-bold text-gray-800 mb-6 text-center", children: "Départements voisins" }),
        /* @__PURE__ */ jsx("div", { className: "flex flex-wrap justify-center gap-3", children: citiesData.departments.filter((d) => d.code !== department).map((dept) => /* @__PURE__ */ jsxs(
          Link,
          {
            to: `/${dept.slug}`,
            children: [
              /* @__PURE__ */ jsx(ArrowRight, { size: 16 }),
              dept.name,
              " (",
              dept.code,
              ")"
            ]
          },
          dept.code
        )) })
      ] }),
      department === "91" && /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-2xl shadow-lg p-8 mb-12", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-2xl font-bold text-gray-800 mb-6 text-center", children: "Notre localisation en Essonne" }),
        /* @__PURE__ */ jsx("div", { className: "w-full rounded-lg overflow-hidden shadow-md", children: /* @__PURE__ */ jsx(
          "iframe",
          {
            src: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d29813.101969137475!2d2.3407840008219627!3d48.66473972389701!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e671a730b6ef99%3A0x60e690c6ca8686ce!2zdGF4aSB2c2wgY29udmVudGlvbm7DqSBhZ3LDqcOpIHPDqWN1cml0w6kgc29jaWFsZQ!5e0!3m2!1sfr!2sfr!4v1776620517246!5m2!1sfr!2sfr",
            width: "100%",
            height: "400",
            style: { border: 0 },
            allowFullScreen: true,
            loading: "lazy",
            referrerPolicy: "no-referrer-when-downgrade",
            title: "Localisation Google Maps - Taxi VSL Conventionné Essonne"
          }
        ) })
      ] }),
      department === "94" && /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-2xl shadow-lg p-8 mb-12", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-2xl font-bold text-gray-800 mb-6 text-center", children: "Notre localisation dans le Val-de-Marne" }),
        /* @__PURE__ */ jsx("div", { className: "w-full rounded-lg overflow-hidden shadow-md", children: /* @__PURE__ */ jsx(
          "iframe",
          {
            src: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d168280.9689252091!2d2.297381289452775!3d48.77444161404638!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e67b94662e87b3%3A0x35f4c18f7871832e!2staxi%20%26%20vsl%20conventionn%C3%A9!5e0!3m2!1sfr!2sfr!4v1764499643238!5m2!1sfr!2sfr",
            width: "100%",
            height: "450",
            style: { border: 0 },
            allowFullScreen: true,
            loading: "lazy",
            referrerPolicy: "no-referrer-when-downgrade",
            title: "Localisation Google Maps - Taxi VSL Conventionné Val-de-Marne"
          }
        ) })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-2xl shadow-lg p-8 text-center mb-12", children: [
        /* @__PURE__ */ jsxs("h2", { className: "text-3xl font-bold mb-4", children: [
          "Besoin d'un transport médical ",
          prep,
          " ",
          deptData.name,
          " ?"
        ] }),
        /* @__PURE__ */ jsx("p", { className: "text-xl mb-6 text-blue-100", children: "Réservez dès maintenant votre transport conventionné CPAM" }),
        /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap justify-center gap-4", children: [
          /* @__PURE__ */ jsxs(
            Link,
            {
              to: "/reservation-taxi-vsl",
              className: "bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-blue-50 transition inline-flex items-center gap-2",
              children: [
                /* @__PURE__ */ jsx(Calendar, { size: 20 }),
                "Réserver en ligne"
              ]
            }
          ),
          /* @__PURE__ */ jsxs(
            "a",
            {
              href: "tel:+33650366491",
              className: "bg-blue-700 text-white px-8 py-4 rounded-lg font-semibold hover:bg-blue-600 transition inline-flex items-center gap-2",
              children: [
                /* @__PURE__ */ jsx(Phone, { size: 20 }),
                "06 50 36 64 91"
              ]
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-2xl shadow-lg p-8", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-2xl font-bold text-gray-800 mb-6", children: "Contact" }),
        /* @__PURE__ */ jsxs("div", { className: "grid md:grid-cols-3 gap-6", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-3", children: [
            /* @__PURE__ */ jsx(Phone, { className: "text-blue-600 mt-1", size: 24 }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("h3", { className: "font-semibold text-gray-800 mb-1", children: "Téléphone" }),
              /* @__PURE__ */ jsx("a", { href: "tel:+33650366491", className: "text-blue-600 hover:underline", children: "06 50 36 64 91" }),
              /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-600", children: "Disponible 24h/24" })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-3", children: [
            /* @__PURE__ */ jsx(Mail, { className: "text-blue-600 mt-1", size: 24 }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("h3", { className: "font-semibold text-gray-800 mb-1", children: "Email" }),
              /* @__PURE__ */ jsx("a", { href: "mailto:contact@taxisparis-conventionnes.fr", className: "text-blue-600 hover:underline", children: "contact@taxisparis-conventionnes.fr" }),
              /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-600", children: "Réponse sous 24h" })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-3", children: [
            /* @__PURE__ */ jsx(MapPin, { className: "text-blue-600 mt-1", size: 24 }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("h3", { className: "font-semibold text-gray-800 mb-1", children: "Zone" }),
              /* @__PURE__ */ jsxs("p", { className: "text-gray-700", children: [
                deptData.name,
                " (",
                deptData.code,
                ")"
              ] }),
              /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-600", children: "Île-de-France" })
            ] })
          ] })
        ] })
      ] })
    ] }) }) })
  ] }) });
}
function hash(str) {
  let h = 0;
  for (let i = 0; i < str.length; i++) {
    h = Math.imul(31, h) + str.charCodeAt(i) | 0;
  }
  return Math.abs(h);
}
function pickStable(arr, seed, count = 1) {
  const out = [];
  let s = seed;
  while (out.length < count && arr.length > 0) {
    const index = s % arr.length;
    out.push(arr[index]);
    s = Math.imul(33, s + 7);
  }
  return out;
}
function generateLocalContent(city, department) {
  const seed = hash(city.slug + department.slug + city.postalCode);
  city.nearStations && city.nearStations.length > 0;
  city.nearAirports && city.nearAirports.length > 0;
  const hasHospitals = city.nearHospitals && city.nearHospitals.filter((h) => h && h.trim()).length > 0;
  const careTypes = [
    "consultations spécialisées",
    "IRM et scanner",
    "séances de dialyse",
    "radiothérapie",
    "chimiothérapie",
    "hospitalisations programmées",
    "rééducation médicale",
    "examens médicaux",
    "soins oncologiques"
  ];
  const logistics = [
    "ponctualité rigoureuse",
    "respect strict des prescriptions médicales",
    "accompagnement personnalisé",
    "coordination avec les établissements de santé",
    "gestion anticipée des horaires",
    "suivi en temps réel",
    "chauffeurs formés au transport médical"
  ];
  const additionalCareDetails = [
    "Notre service médical conventionné accompagne quotidiennement les patients nécessitant des soins réguliers. Les trajets de dialyse, chimiothérapie ou radiothérapie requièrent une ponctualité absolue que nous garantissons systématiquement.",
    "Spécialisés dans le transport sanitaire, nos chauffeurs connaissent les protocoles médicaux et adaptent leur conduite à votre état de santé. Chaque véhicule est désinfecté après chaque transport.",
    "La coordination avec les services hospitaliers fait partie intégrante de notre métier. Nous vérifions les horaires de rendez-vous et anticipons les temps de stationnement dans les centres médicaux.",
    "Pour les patients en traitement longue durée, nous proposons un service de transport récurrent avec le même chauffeur pour créer une relation de confiance et assurer un suivi personnalisé.",
    "Les examens d'imagerie médicale (IRM, scanner, radiographie) nécessitent souvent un transport adapté. Nos véhicules spacieux permettent de voyager confortablement même après des examens fatigants.",
    "Notre expérience du transport médical nous permet d'anticiper les besoins spécifiques : aide à la mobilité, temps supplémentaire pour la marche, accompagnement jusqu'à la salle d'attente."
  ];
  const contextualParagraphs = [
    `La commune de ${city.name}, située dans le ${department.name} en région Île-de-France, bénéficie d'un accès privilégié à notre réseau de transport médical conventionné. Les résidents peuvent compter sur un service de qualité pour tous leurs déplacements de santé prescrits.`,
    `Au cœur du ${department.name}, ${city.name} est parfaitement desservie par notre flotte de taxis conventionnés et VSL. La proximité des grands axes routiers franciliens nous permet de vous conduire rapidement vers n'importe quel établissement de santé de la région.`,
    `${city.name} fait partie intégrante de notre zone d'intervention prioritaire dans le ${department.name}. Nos chauffeurs connaissent parfaitement les spécificités locales de circulation et les meilleurs itinéraires vers les centres hospitaliers.`,
    `Implanté en Île-de-France, notre service dessert quotidiennement ${city.name} et l'ensemble du ${department.name}. Cette proximité géographique nous permet d'assurer des délais d'intervention courts et une grande réactivité.`,
    `${city.name}, comme l'ensemble des communes du ${department.name}, bénéficie de notre expertise en transport médical. Située en région Île-de-France, la ville profite d'un accès direct aux meilleurs établissements hospitaliers.`
  ];
  const introVariants = [
    `Notre service de taxi conventionné CPAM à ${city.name} assure vos déplacements médicaux vers l'ensemble des hôpitaux et cliniques d'Île-de-France. Installés localement, nous connaissons parfaitement les itinéraires optimaux depuis ${city.name} pour vous garantir un transport ponctuel et sécurisé. Chaque trajet médical est organisé avec rigueur pour respecter vos horaires de consultation.`,
    `Depuis ${city.name}, nos chauffeurs professionnels organisent quotidiennement des trajets sanitaires en taxi conventionné et VSL sur prescription médicale. Spécialisés dans le transport médical, nous accompagnons les patients de ${city.name} vers leurs rendez-vous hospitaliers avec un service adapté à chaque situation de santé. La prise en charge CPAM simplifie vos démarches administratives.`,
    `Notre équipe de transport médical intervient spécifiquement à ${city.name} pour l'ensemble de vos rendez-vous médicaux prescrits. Que vous résidiez en centre-ville de ${city.name} ou dans les quartiers périphériques, nous assurons une prise en charge à domicile pour tous vos déplacements de santé. Le service conventionné vous permet de voyager sans avancer de frais.`,
    `Taxi conventionné et VSL à ${city.name} : un service de transport médical agréé Sécurité sociale pour vos consultations spécialisées et soins réguliers. Les habitants de ${city.name} bénéficient d'un accompagnement personnalisé lors de leurs trajets vers les centres hospitaliers franciliens. Notre flotte sanitaire est équipée pour garantir votre confort durant le transport.`,
    `Le service de taxi médical conventionné à ${city.name} facilite vos déplacements de santé dans toute l'Île-de-France. Actifs sur le secteur de ${city.name} depuis de nombreuses années, nous connaissons les spécificités locales et les meilleurs accès aux établissements de soins. Votre prescription médicale de transport suffit pour bénéficier du tiers-payant.`,
    `Implanté à ${city.name} (${department.name}), notre service de transport sanitaire assure l'ensemble des trajets médicaux prescrits par votre médecin traitant. Les patients de ${city.name} profitent d'une disponibilité étendue et d'une réactivité optimale pour leurs rendez-vous médicaux urgents ou programmés. Nous coordonnons chaque trajet avec les services hospitaliers.`,
    `Notre service de transport sanitaire conventionné dessert l'ensemble du territoire de ${city.name} et rayonne sur toute l'Île-de-France pour vos rendez-vous médicaux. Spécialisés dans le transport de personnes nécessitant des soins réguliers, nous sommes le partenaire santé des résidents de ${city.name}. La facturation directe avec la CPAM vous évite toute avance de frais.`,
    `Transport médical agréé CPAM depuis ${city.name} vers l'ensemble des centres hospitaliers et cliniques franciliens. Notre connaissance approfondie du réseau de santé et des itinéraires depuis ${city.name} nous permet d'optimiser chaque trajet médical. Nous intervenons pour tous types de consultations, examens et traitements prescrits.`
  ];
  const serviceVariants = [
    "Notre service de taxi conventionné",
    "Nos chauffeurs professionnels",
    "Notre flotte de véhicules agréés",
    "Notre équipe spécialisée",
    "Nos taxis médicaux",
    "Notre entreprise de transport sanitaire",
    "Nos conducteurs qualifiés"
  ];
  const intro = pickStable(introVariants, seed, 1)[0];
  const serviceType = pickStable(serviceVariants, seed + 2, 1)[0];
  const selectedCare = pickStable(careTypes, seed + 4, 4).join(", ");
  const selectedLogistics = pickStable(logistics, seed + 9, 3).join(", ");
  const additionalDetail = pickStable(additionalCareDetails, seed + 50, 1)[0];
  const contextParagraph = pickStable(contextualParagraphs, seed + 60, 1)[0];
  const organizationIntros = [
    `Le transport médical depuis ${city.name} nécessite une organisation rigoureuse pour garantir le respect de vos horaires de rendez-vous. Notre équipe basée localement connaît parfaitement les spécificités de circulation à ${city.name} et anticipe les temps de trajet pour vous assurer une arrivée ponctuelle à vos consultations médicales.`,
    `Nous planifions méticuleusement chaque trajet médical au départ de ${city.name} pour assurer votre ponctualité absolue. Grâce à notre expérience du secteur de ${city.name}, nous calculons précisément les délais nécessaires et optimisons les itinéraires vers chaque établissement hospitalier francilien.`,
    `Votre confort et votre sérénité sont prioritaires lors de vos déplacements médicaux depuis ${city.name}. Nos chauffeurs formés au transport sanitaire adaptent leur conduite à votre état de santé et veillent à rendre chaque trajet depuis ${city.name} aussi agréable que possible, quelle que soit la distance.`,
    `Chaque transport sanitaire depuis ${city.name} est coordonné avec précision pour respecter vos contraintes horaires médicales. Nous synchronisons nos départs de ${city.name} avec vos rendez-vous hospitaliers et maintenons un contact permanent pour garantir votre tranquillité d'esprit durant tout le parcours.`,
    `La fiabilité de nos services de taxi conventionné à ${city.name} repose sur une préparation minutieuse de chaque trajet médical. En amont de votre prise en charge à ${city.name}, nous vérifions les conditions de circulation et sélectionnons le meilleur itinéraire pour vous conduire sereinement vers votre destination de soins.`
  ];
  const organizationIntro = pickStable(organizationIntros, seed + 12, 1)[0];
  const benefitsList = [
    [
      "Prise en charge directe à votre domicile",
      "Véhicules sanitaires confortables et équipés",
      "Chauffeurs expérimentés et à l'écoute",
      "Tiers-payant CPAM selon votre situation"
    ],
    [
      "Service disponible 7 jours sur 7",
      "Respect strict des horaires médicaux",
      "Assistance personnalisée durant le trajet",
      "Aucune avance de frais dans la plupart des cas"
    ],
    [
      "Trajets directs sans détour inutile",
      "Coordination avec les services hospitaliers",
      "Véhicules régulièrement contrôlés",
      "Prise en charge par la Sécurité sociale"
    ],
    [
      "Réservation simple et rapide",
      "Confirmation systématique de rendez-vous",
      "Suivi personnalisé de votre dossier",
      "Facturation directe avec la CPAM"
    ]
  ];
  const benefits = pickStable(benefitsList, seed + 18, 1)[0];
  const paragraph = `
${intro}

${serviceType} prend en charge : ${selectedCare}.
Chaque trajet est organisé avec ${selectedLogistics}.

${additionalDetail}

${contextParagraph}

Sur prescription médicale de transport, le tiers-payant CPAM est appliqué selon votre éligibilité. Vous n'avez généralement aucun frais à avancer pour vos trajets médicaux conventionnés. Le transport médical conventionné depuis ${city.name} couvre l'intégralité du territoire francilien.
`;
  const organizationText = `
${organizationIntro}

${serviceType} assure :
• ${benefits.join("\n• ")}

Que vous ayez besoin d'un trajet vers ${hasHospitals ? city.nearHospitals.filter((h) => h && h.trim())[0] : "un établissement hospitalier d'Île-de-France"} ou tout autre centre médical francilien, nous vous garantissons un service professionnel et ponctuel.
`;
  const faq = [
    {
      q: `Comment réserver un taxi conventionné à ${city.name} ?`,
      a: `Appelez-nous au 06 50 36 64 91 ou réservez en ligne sur notre formulaire. Munissez-vous de votre prescription médicale de transport (PMT) et de votre carte Vitale. Nous confirmons votre trajet sous quelques minutes.`
    },
    {
      q: `Le trajet est-il remboursé par la CPAM ?`,
      a: `Oui, sur prescription médicale de transport, la CPAM prend en charge 65% à 100% du trajet selon votre situation (ALD, maternité, accident du travail). Le tiers-payant évite toute avance de frais dans la plupart des cas.`
    },
    {
      q: `Quels transports médicaux proposez-vous depuis ${city.name} ?`,
      a: `Nous assurons tous les transports prescrits : dialyse, chimiothérapie, radiothérapie, consultations spécialisées, examens (IRM, scanner), hospitalisations programmées et sorties d'hôpital. Service disponible 24h/24, 7j/7.`
    },
    {
      q: `Vers quels hôpitaux pouvez-vous m'emmener depuis ${city.name} ?`,
      a: `Nous desservons l'ensemble des hôpitaux d'Île-de-France, notamment l'Institut Gustave Roussy (Villejuif), Hôpital Bicêtre (Le Kremlin-Bicêtre), Pitié-Salpêtrière (Paris 13e), Lariboisière (Paris 10e), Cochin (Paris 14e), Georges Pompidou (Paris 15e) et tous les autres établissements sur prescription.`
    }
  ];
  const tripDescriptions = [
    "Trajets réguliers pour consultations spécialisées",
    "Transport pour examens et imagerie médicale",
    "Déplacements pour soins oncologiques",
    "Accès aux services d'urgences et consultations",
    "Trajets pour dialyse et traitements réguliers",
    "Transport vers services de cardiologie",
    "Accès aux consultations de médecine interne",
    "Déplacements pour radiothérapie et chimiothérapie"
  ];
  const frequentTrips = hasHospitals ? city.nearHospitals.filter((h) => h && h.trim()).slice(0, 4).map((hospital, idx) => ({
    from: city.name,
    to: hospital,
    description: pickStable(tripDescriptions, seed + idx + 100, 1)[0]
  })) : [
    { from: city.name, to: "Institut Gustave Roussy", description: pickStable(tripDescriptions, seed + 100, 1)[0] },
    { from: city.name, to: "Hôpital Bicêtre", description: pickStable(tripDescriptions, seed + 101, 1)[0] },
    { from: city.name, to: "Hôpital Cochin", description: pickStable(tripDescriptions, seed + 102, 1)[0] },
    { from: city.name, to: "Pitié-Salpêtrière", description: pickStable(tripDescriptions, seed + 103, 1)[0] }
  ];
  const whyChooseVariants = [
    [
      "Agrément CPAM valide et à jour",
      "Flotte de véhicules confortables et récents",
      "Chauffeurs formés au transport de personnes à mobilité réduite",
      "Service client réactif et disponible",
      "Tarifs conventionnés transparents"
    ],
    [
      "Plus de 10 ans d'expérience dans le transport médical",
      "Connaissance parfaite des hôpitaux franciliens",
      "Respect strict des protocoles sanitaires",
      "Ponctualité garantie pour vos rendez-vous",
      "Accompagnement personnalisé selon vos besoins"
    ],
    [
      "Service de qualité reconnu par nos patients",
      "Véhicules adaptés à tous types de pathologies",
      "Prise en charge douce et sécurisée",
      "Gestion administrative simplifiée",
      "Disponibilité 7j/7 pour urgences et rendez-vous programmés"
    ]
  ];
  const whyChoose = pickStable(whyChooseVariants, seed + 25, 1)[0];
  const additionalSections = {
    accessibility: [
      `L'accessibilité de nos services à ${city.name} constitue une priorité absolue. Nos véhicules sont équipés pour accueillir les personnes à mobilité réduite, avec des systèmes d'aide à l'embarquement et des espaces adaptés pour les fauteuils roulants pliants.`,
      `À ${city.name}, nous adaptons chaque transport aux besoins spécifiques des patients. Que vous nécessitiez une assistance particulière ou un accompagnement renforcé, nos chauffeurs formés sont à votre écoute pour garantir votre confort et votre sécurité.`,
      `Notre flotte de taxis conventionnés desservant ${city.name} comprend des véhicules spacieux permettant le transport de matériel médical (déambulateur, bouteilles d'oxygène) tout en assurant votre confort durant le trajet.`,
      `Les patients de ${city.name} bénéficient d'un service personnalisé tenant compte de leur mobilité. Nos chauffeurs prennent le temps nécessaire pour l'installation en toute sécurité et n'hésitent pas à apporter leur aide jusqu'au service hospitalier.`
    ],
    coverage: [
      `Le service de taxi conventionné à ${city.name} couvre l'ensemble du territoire francilien. Depuis ${city.name}, nous organisons des trajets vers Paris et toutes les communes d'Île-de-France disposant d'établissements de santé. Notre connaissance du réseau routier régional garantit l'optimisation de chaque trajet.`,
      `Implanté dans le ${department.name}, notre service rayonne naturellement sur ${city.name} et ses environs. Cette implantation locale nous permet de connaître parfaitement les spécificités de circulation à ${city.name} et d'anticiper les temps de trajet avec précision.`,
      `${city.name} se situe dans une zone géographique stratégique de l'Île-de-France. Cette position facilite l'accès aux principaux centres hospitaliers parisiens et régionaux. Nos chauffeurs utilisent les axes rapides pour minimiser vos temps de transport.`,
      `Notre couverture géographique depuis ${city.name} englobe les cinq départements de la petite couronne ainsi que Paris intra-muros. Quel que soit l'emplacement de votre établissement de santé, nous vous y conduisons dans les meilleures conditions.`
    ],
    booking: [
      `Réserver un transport médical depuis ${city.name} s'effectue simplement par téléphone ou via notre plateforme en ligne. Indiquez-nous votre adresse à ${city.name}, votre destination médicale et l'horaire souhaité. Nous confirmons immédiatement la disponibilité et planifions votre trajet.`,
      `Pour vos trajets réguliers depuis ${city.name} (dialyse, chimiothérapie), nous proposons la mise en place de créneaux récurrents. Cette organisation systématique vous libère de la contrainte de réservation et assure la continuité de vos soins.`,
      `La réservation anticipée depuis ${city.name} reste recommandée, particulièrement pour les rendez-vous matinaux ou les trajets vers des établissements éloignés. Toutefois, notre réactivité nous permet d'honorer des demandes à court délai selon les disponibilités.`,
      `Lors de votre réservation au départ de ${city.name}, munissez-vous de votre prescription médicale de transport et des coordonnées précises de l'établissement de destination. Ces informations nous permettent d'optimiser l'organisation de votre trajet médical.`
    ]
  };
  const selectedAccessibility = pickStable(additionalSections.accessibility, seed + 70, 1)[0];
  const selectedCoverage = pickStable(additionalSections.coverage, seed + 80, 1)[0];
  const selectedBooking = pickStable(additionalSections.booking, seed + 90, 1)[0];
  return {
    paragraph,
    organizationText,
    faq,
    frequentTrips,
    whyChoose,
    selectedAccessibility,
    selectedCoverage,
    selectedBooking
  };
}
function CityPage() {
  const { departmentSlug, citySlug } = useParams();
  console.log("SSR COMPONENT: City");
  console.log("PARAMS:", departmentSlug, citySlug);
  const department = citiesData.departments.find(
    (d) => d.slug === departmentSlug
  );
  const city = department == null ? void 0 : department.cities.find(
    (c) => c.slug === citySlug
  );
  if (!department || !city) {
    return /* @__PURE__ */ jsx("div", { className: "text-center py-20", children: "Ville non trouvée" });
  }
  const baseUrl = `https://www.taxisparis-conventionnes.fr/${departmentSlug}/${citySlug}`;
  hash(city.slug + city.postalCode);
  const seoTitle = `Taxi Conventionné ${city.name} (${city.postalCode}) | CPAM | Transport Médical 24h/24`;
  const h1Text = `Taxi Conventionné à ${city.name} (${city.postalCode})`;
  const Icon = ShieldCheck;
  const {
    paragraph,
    organizationText,
    faq,
    frequentTrips,
    whyChoose,
    selectedAccessibility,
    selectedCoverage,
    selectedBooking
  } = useMemo(
    () => generateLocalContent(city, department),
    [city, department]
  );
  const metaDescription = `Taxi conventionné à ${city.name} (${city.postalCode}). Transport médical remboursé CPAM vers hôpitaux de Paris et Île-de-France. Dialyse, chimio, hospitalisation. Réservation 24h/24 : 06 50 36 64 91.`;
  const nearbyCities = city.nearCities ? department.cities.filter((c) => city.nearCities.includes(c.slug)) : department.cities.filter((c) => c.slug !== citySlug).slice(0, 5);
  const allNearbyCities = department.cities.filter((c) => c.slug !== citySlug).slice(0, 8);
  const jsonLD = {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "TaxiService", "MedicalBusiness"],
    "name": `Taxi Conventionné CPAM ${city.name}`,
    "alternateName": `Transport Médical ${city.name}`,
    "description": `Service de taxi conventionné et VSL à ${city.name} (${city.postalCode}) dans le ${department.name}, Île-de-France. Transport médical agréé Sécurité sociale pour consultations, dialyse, chimiothérapie, radiothérapie. Tiers-payant CPAM. Transferts hôpitaux, gares et aéroports.`,
    "url": baseUrl,
    "telephone": "+33650366491",
    "priceRange": "Tiers-payant CPAM (65% à 100% pris en charge)",
    "currenciesAccepted": "EUR",
    "paymentAccepted": "Tiers-payant CPAM, Carte bancaire, Mutuelle",
    "areaServed": [
      {
        "@type": "City",
        "name": city.name,
        "postalCode": city.postalCode,
        "addressRegion": department.name,
        "addressCountry": "FR"
      },
      {
        "@type": "State",
        "name": "Île-de-France",
        "addressCountry": "FR"
      }
    ],
    "address": {
      "@type": "PostalAddress",
      "addressLocality": city.name,
      "postalCode": city.postalCode,
      "addressRegion": department.name,
      "addressCountry": "FR"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "addressCountry": "FR"
    },
    "serviceType": ["Transport médical conventionné CPAM", "Taxi conventionné", "VSL", "Transport sanitaire"],
    "availableService": [
      {
        "@type": "Service",
        "name": "Taxi conventionné CPAM",
        "description": "Transport médical individuel avec tiers-payant selon prescription",
        "provider": {
          "@type": "TaxiService",
          "name": `Taxi Conventionné ${city.name}`
        }
      },
      {
        "@type": "Service",
        "name": "VSL (Véhicule Sanitaire Léger)",
        "description": "Transport sanitaire assis professionnalisé pour 3 patients maximum",
        "provider": {
          "@type": "MedicalBusiness",
          "name": `VSL ${city.name}`
        }
      },
      {
        "@type": "Service",
        "name": "Transport pour dialyse",
        "description": "Trajets réguliers pour séances de dialyse avec tiers-payant CPAM"
      },
      {
        "@type": "Service",
        "name": "Transport pour chimiothérapie",
        "description": "Accompagnement pour traitements de chimiothérapie"
      },
      {
        "@type": "Service",
        "name": "Transfert gare et aéroport médical",
        "description": "Transferts vers gares parisiennes et aéroports sur prescription médicale"
      }
    ],
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday"
      ],
      "opens": "00:00",
      "closes": "23:59"
    },
    "sameAs": [
      "https://www.taxisparis-conventionnes.fr"
    ],
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "reviewCount": "127",
      "bestRating": "5",
      "worstRating": "1"
    }
  };
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(
      SEOHead,
      {
        title: seoTitle,
        description: metaDescription,
        canonical: baseUrl,
        jsonLD
      }
    ),
    /* @__PURE__ */ jsxs("div", { className: "bg-white", children: [
      /* @__PURE__ */ jsx("div", { className: "bg-gradient-to-r from-blue-900 to-blue-700 text-white py-16", children: /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto px-6", children: [
        /* @__PURE__ */ jsx("h1", { className: "text-4xl md:text-6xl font-extrabold mb-4", children: h1Text }),
        /* @__PURE__ */ jsx("h2", { className: "text-2xl text-blue-100", children: "Transport médical remboursé CPAM | Dialyse, Chimio, Hospitalisation" })
      ] }) }),
      /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto px-6 py-16 grid lg:grid-cols-3 gap-16", children: [
        /* @__PURE__ */ jsxs("div", { className: "lg:col-span-2 space-y-10", children: [
          /* @__PURE__ */ jsxs("div", { className: "lg:hidden bg-blue-900 text-white p-6 rounded-2xl text-center shadow-xl", children: [
            /* @__PURE__ */ jsxs("h4", { className: "text-lg font-bold mb-3", children: [
              "Réservation à ",
              city.name
            ] }),
            /* @__PURE__ */ jsx("p", { className: "text-blue-200 text-sm mb-4", children: "Service disponible 7j/7" }),
            /* @__PURE__ */ jsxs(
              "a",
              {
                href: "tel:+33650366491",
                className: "bg-white text-blue-900 font-bold py-4 px-6 rounded-xl inline-flex items-center gap-2 hover:bg-blue-50 transition shadow-lg hover:shadow-xl mb-3 w-full justify-center",
                children: [
                  /* @__PURE__ */ jsx(Phone, { className: "w-5 h-5" }),
                  "06 50 36 64 91"
                ]
              }
            ),
            /* @__PURE__ */ jsxs(
              Link,
              {
                to: "/reservation-taxi-vsl",
                className: "bg-blue-700 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-xl inline-flex items-center gap-2 transition w-full justify-center",
                children: [
                  /* @__PURE__ */ jsx(Calendar, { className: "w-5 h-5" }),
                  "Réserver en ligne"
                ]
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("section", { children: [
            /* @__PURE__ */ jsx("div", { className: "bg-blue-50 border-l-4 border-blue-600 p-4 rounded-r-xl mb-6", children: /* @__PURE__ */ jsxs("p", { className: "text-sm text-gray-700", children: [
              /* @__PURE__ */ jsx(Link, { to: `/${departmentSlug}/`, className: "text-blue-600 hover:text-blue-800 font-semibold hover:underline", children: department.name }),
              " ",
              ">",
              " ",
              /* @__PURE__ */ jsx("span", { className: "text-gray-900 font-semibold", children: city.name }),
              " ",
              "•",
              " ",
              /* @__PURE__ */ jsx(Link, { to: "/zones-desservies/", className: "text-blue-600 hover:text-blue-800 hover:underline", children: "Toutes nos zones" })
            ] }) }),
            /* @__PURE__ */ jsxs("h3", { className: "text-3xl font-bold flex items-center gap-3 mb-6", children: [
              /* @__PURE__ */ jsx(Icon, { className: "text-blue-600 w-8 h-8" }),
              "Transport médical conventionné à ",
              city.name
            ] }),
            /* @__PURE__ */ jsx("div", { className: "prose prose-lg whitespace-pre-line text-gray-700", children: paragraph })
          ] }),
          /* @__PURE__ */ jsxs("section", { children: [
            /* @__PURE__ */ jsxs("h3", { className: "text-2xl font-bold flex items-center gap-2 mb-6", children: [
              /* @__PURE__ */ jsx(Activity, { className: "text-blue-600" }),
              "Organisation des trajets médicaux depuis ",
              city.name
            ] }),
            /* @__PURE__ */ jsx("div", { className: "prose prose-lg whitespace-pre-line text-gray-700", children: organizationText }),
            /* @__PURE__ */ jsx("div", { className: "mt-4 p-4 bg-gray-50 rounded-xl border border-gray-200", children: /* @__PURE__ */ jsxs("p", { className: "text-sm text-gray-700", children: [
              "Notre service de taxi conventionné couvre l'ensemble du",
              " ",
              /* @__PURE__ */ jsx(Link, { to: `/${departmentSlug}/`, className: "text-blue-600 hover:text-blue-800 font-semibold hover:underline", children: department.name }),
              " ",
              "et toute",
              " ",
              /* @__PURE__ */ jsx(Link, { to: "/zones-desservies/", className: "text-blue-600 hover:text-blue-800 font-semibold hover:underline", children: "l'Île-de-France" }),
              ".",
              " ",
              /* @__PURE__ */ jsx(Link, { to: "/reservation-taxi-vsl/", className: "text-blue-600 hover:text-blue-800 font-semibold hover:underline", children: "Réservez votre transport médical" }),
              " ",
              "en quelques clics."
            ] }) })
          ] }),
          /* @__PURE__ */ jsxs("section", { children: [
            /* @__PURE__ */ jsxs("h3", { className: "text-2xl font-bold flex items-center gap-2 mb-6", children: [
              /* @__PURE__ */ jsx(MapPin, { className: "text-blue-600" }),
              "Trajets médicaux fréquents depuis ",
              city.name
            ] }),
            /* @__PURE__ */ jsxs("p", { className: "text-gray-700 mb-6", children: [
              "Les patients de ",
              city.name,
              " nous font confiance pour leurs déplacements médicaux réguliers. Voici les trajets les plus fréquemment effectués depuis ",
              city.name,
              " vers les grands centres hospitaliers franciliens :"
            ] }),
            /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4 mb-4", children: frequentTrips.map((trip, i) => /* @__PURE__ */ jsxs("div", { className: "border-l-4 border-blue-600 bg-blue-50 rounded-lg p-4", children: [
              /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 font-semibold text-gray-900 mb-1", children: [
                /* @__PURE__ */ jsx("span", { children: trip.from }),
                /* @__PURE__ */ jsx("span", { className: "text-blue-600", children: "→" }),
                /* @__PURE__ */ jsx("span", { children: trip.to })
              ] }),
              /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-600", children: trip.description })
            ] }, i)) }),
            /* @__PURE__ */ jsxs("div", { className: "bg-white border border-blue-200 rounded-xl p-5", children: [
              /* @__PURE__ */ jsxs("p", { className: "text-gray-700 mb-3", children: [
                "Que vous habitiez le centre de ",
                city.name,
                " ou ses quartiers périphériques, nous organisons vos trajets médicaux vers l'ensemble des hôpitaux et cliniques d'Île-de-France. Chaque déplacement depuis ",
                city.name,
                " est pris en charge sur prescription médicale avec le tiers-payant CPAM."
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap gap-3 text-sm", children: [
                /* @__PURE__ */ jsxs(
                  Link,
                  {
                    to: "/taxis-aeroports-parisiens",
                    className: "inline-flex items-center gap-1 text-blue-600 hover:text-blue-800 hover:underline font-medium",
                    children: [
                      /* @__PURE__ */ jsx(Plane, { className: "w-4 h-4" }),
                      "Transferts aéroports"
                    ]
                  }
                ),
                /* @__PURE__ */ jsx("span", { className: "text-gray-300", children: "|" }),
                /* @__PURE__ */ jsxs(
                  Link,
                  {
                    to: "/taxis-gares-parisiennes",
                    className: "inline-flex items-center gap-1 text-blue-600 hover:text-blue-800 hover:underline font-medium",
                    children: [
                      /* @__PURE__ */ jsx(Brain, { className: "w-4 h-4" }),
                      "Transferts gares"
                    ]
                  }
                ),
                /* @__PURE__ */ jsx("span", { className: "text-gray-300", children: "|" }),
                /* @__PURE__ */ jsxs(
                  Link,
                  {
                    to: "/reservation-taxi-vsl",
                    className: "inline-flex items-center gap-1 text-blue-600 hover:text-blue-800 hover:underline font-medium",
                    children: [
                      /* @__PURE__ */ jsx(Calendar, { className: "w-4 h-4" }),
                      "Réserver maintenant"
                    ]
                  }
                )
              ] })
            ] })
          ] }),
          city.nearHospitals && city.nearHospitals.filter((h) => h && h.trim()).length > 0 && /* @__PURE__ */ jsxs("section", { children: [
            /* @__PURE__ */ jsxs("h3", { className: "text-2xl font-bold flex items-center gap-2 mb-6", children: [
              /* @__PURE__ */ jsx(Building2, { className: "text-blue-600" }),
              "Hôpitaux desservis depuis ",
              city.name
            ] }),
            /* @__PURE__ */ jsxs("p", { className: "text-gray-700 mb-6", children: [
              "Notre service de taxi conventionné à ",
              city.name,
              " vous conduit vers les principaux établissements hospitaliers de la région. Ces centres de santé sont régulièrement desservis par nos chauffeurs au départ de ",
              city.name,
              " :"
            ] }),
            /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: city.nearHospitals.filter((h) => h && h.trim()).map((hospital, i) => /* @__PURE__ */ jsxs("div", { className: "border rounded-xl p-4 flex items-center gap-3 hover:border-blue-600 hover:bg-blue-50 transition", children: [
              /* @__PURE__ */ jsx(Stethoscope, { className: "text-blue-500 w-5 h-5 flex-shrink-0" }),
              /* @__PURE__ */ jsx("span", { className: "text-gray-700", children: hospital })
            ] }, i)) }),
            /* @__PURE__ */ jsxs("p", { className: "text-gray-600 mt-4", children: [
              "Depuis ",
              city.name,
              ", nous assurons également le transport médical conventionné CPAM vers tous les autres établissements de santé d'Île-de-France selon votre prescription médicale."
            ] })
          ] }),
          /* @__PURE__ */ jsxs("section", { children: [
            /* @__PURE__ */ jsxs("h3", { className: "text-2xl font-bold flex items-center gap-2 mb-6", children: [
              /* @__PURE__ */ jsx(ShieldCheck, { className: "text-blue-600" }),
              "Pourquoi choisir notre taxi conventionné à ",
              city.name,
              " ?"
            ] }),
            /* @__PURE__ */ jsx("div", { className: "bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6", children: /* @__PURE__ */ jsx("ul", { className: "space-y-3", children: whyChoose.map((reason, i) => /* @__PURE__ */ jsxs("li", { className: "flex items-start gap-3", children: [
              /* @__PURE__ */ jsx("div", { className: "mt-1 w-2 h-2 bg-blue-600 rounded-full flex-shrink-0" }),
              /* @__PURE__ */ jsx("span", { className: "text-gray-700", children: reason })
            ] }, i)) }) })
          ] }),
          /* @__PURE__ */ jsxs("section", { children: [
            /* @__PURE__ */ jsxs("h3", { className: "text-2xl font-bold flex items-center gap-2 mb-6", children: [
              /* @__PURE__ */ jsx(Users, { className: "text-blue-600" }),
              "Accessibilité et adaptation à ",
              city.name
            ] }),
            /* @__PURE__ */ jsx("div", { className: "prose prose-lg text-gray-700", children: /* @__PURE__ */ jsx("p", { children: selectedAccessibility }) })
          ] }),
          /* @__PURE__ */ jsxs("section", { children: [
            /* @__PURE__ */ jsxs("h3", { className: "text-2xl font-bold flex items-center gap-2 mb-6", children: [
              /* @__PURE__ */ jsx(MapPin, { className: "text-blue-600" }),
              "Couverture géographique depuis ",
              city.name
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "prose prose-lg text-gray-700", children: [
              /* @__PURE__ */ jsx("p", { children: selectedCoverage }),
              /* @__PURE__ */ jsxs("p", { className: "mt-4", children: [
                "Le ",
                department.name,
                ", dont fait partie ",
                city.name,
                ", est idéalement situé en région Île-de-France. Cette localisation centrale facilite les trajets médicaux vers l'ensemble des établissements hospitaliers de la région parisienne. Notre connaissance approfondie du réseau routier francilien et de ses particularités de circulation nous permet d'optimiser chaque déplacement depuis ",
                city.name,
                "."
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("section", { children: [
            /* @__PURE__ */ jsxs("h3", { className: "text-2xl font-bold flex items-center gap-2 mb-6", children: [
              /* @__PURE__ */ jsx(Calendar, { className: "text-blue-600" }),
              "Comment réserver votre taxi conventionné à ",
              city.name
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "prose prose-lg text-gray-700", children: [
              /* @__PURE__ */ jsx("p", { children: selectedBooking }),
              /* @__PURE__ */ jsxs("p", { className: "mt-4", children: [
                "Habitants de ",
                city.name,
                " dans le ",
                department.name,
                ", vous pouvez nous contacter 7 jours sur 7 pour organiser vos déplacements médicaux. Notre équipe connaît parfaitement le secteur de ",
                city.name,
                " et saura vous conseiller sur les meilleurs horaires de départ pour respecter vos rendez-vous hospitaliers. Le service client reste disponible pour répondre à toutes vos questions sur le transport médical conventionné CPAM depuis ",
                city.name,
                "."
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("section", { className: "bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl p-8 text-center text-white shadow-xl", children: [
            /* @__PURE__ */ jsxs("h3", { className: "text-2xl font-bold mb-4", children: [
              "Réservez votre transport médical depuis ",
              city.name
            ] }),
            /* @__PURE__ */ jsx("p", { className: "text-blue-100 mb-6 max-w-2xl mx-auto", children: "Service disponible 24h/24 et 7j/7 pour vos déplacements médicaux prescrits" }),
            /* @__PURE__ */ jsxs("div", { className: "flex flex-col sm:flex-row gap-4 justify-center items-center", children: [
              /* @__PURE__ */ jsxs(
                "a",
                {
                  href: "tel:+33650366491",
                  className: "inline-flex items-center justify-center gap-2 bg-white text-blue-600 hover:bg-blue-50 px-8 py-4 rounded-xl font-bold transition shadow-lg hover:shadow-xl text-lg w-full sm:w-auto",
                  children: [
                    /* @__PURE__ */ jsx(Phone, { className: "w-6 h-6" }),
                    /* @__PURE__ */ jsxs("span", { className: "flex flex-col items-start", children: [
                      /* @__PURE__ */ jsx("span", { className: "text-xs font-normal text-blue-500", children: "Appelez-nous" }),
                      /* @__PURE__ */ jsx("span", { children: "06 50 36 64 91" })
                    ] })
                  ]
                }
              ),
              /* @__PURE__ */ jsxs(
                Link,
                {
                  to: "/reservation-taxi-vsl",
                  className: "inline-flex items-center justify-center gap-2 bg-blue-800 hover:bg-blue-900 text-white px-8 py-4 rounded-xl font-bold transition shadow-lg hover:shadow-xl text-lg border-2 border-blue-300 w-full sm:w-auto",
                  children: [
                    /* @__PURE__ */ jsx(Calendar, { className: "w-6 h-6" }),
                    "Réserver en ligne"
                  ]
                }
              )
            ] }),
            /* @__PURE__ */ jsx("p", { className: "text-blue-200 text-sm mt-6", children: "Munissez-vous de votre prescription médicale de transport" })
          ] }),
          /* @__PURE__ */ jsxs("section", { children: [
            /* @__PURE__ */ jsxs("h3", { className: "text-2xl font-bold mb-4", children: [
              "Questions fréquentes à ",
              city.name
            ] }),
            /* @__PURE__ */ jsx("div", { className: "space-y-4", children: faq.map((f, i) => /* @__PURE__ */ jsxs("div", { className: "border rounded-xl p-4", children: [
              /* @__PURE__ */ jsx("p", { className: "font-semibold", children: f.q }),
              /* @__PURE__ */ jsx("p", { className: "text-gray-600 mt-2", children: f.a })
            ] }, i)) })
          ] }),
          /* @__PURE__ */ jsxs("section", { className: "bg-gradient-to-br from-gray-50 to-blue-50 rounded-2xl p-8", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6", children: [
              /* @__PURE__ */ jsxs("h3", { className: "text-2xl font-bold flex items-center gap-2", children: [
                /* @__PURE__ */ jsx(MapPin, { className: "text-blue-600" }),
                "Taxis conventionnés dans les villes voisines"
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "flex flex-col sm:flex-row gap-3", children: [
                /* @__PURE__ */ jsxs(
                  "a",
                  {
                    href: "tel:+33650366491",
                    className: "inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold transition shadow-lg hover:shadow-xl",
                    children: [
                      /* @__PURE__ */ jsx(Phone, { className: "w-5 h-5" }),
                      "06 50 36 64 91"
                    ]
                  }
                ),
                /* @__PURE__ */ jsxs(
                  Link,
                  {
                    to: "/reservation-taxi-vsl",
                    className: "inline-flex items-center justify-center gap-2 bg-white border-2 border-blue-600 text-blue-600 hover:bg-blue-50 px-6 py-3 rounded-xl font-semibold transition shadow-md hover:shadow-lg",
                    children: [
                      /* @__PURE__ */ jsx(Calendar, { className: "w-5 h-5" }),
                      "Réserver"
                    ]
                  }
                )
              ] })
            ] }),
            /* @__PURE__ */ jsxs("p", { className: "text-gray-700 mb-6", children: [
              "Notre service de taxi conventionné dessert également les communes proches de ",
              city.name,
              ". Découvrez nos services dans les villes voisines du ",
              department.name,
              "."
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "mb-6", children: [
              /* @__PURE__ */ jsx("h4", { className: "font-semibold text-lg mb-4 text-gray-900", children: "Communes proches desservies par notre service" }),
              /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3", children: nearbyCities.map((neighbor) => /* @__PURE__ */ jsxs(
                Link,
                {
                  to: `/${departmentSlug}/${neighbor.slug}`,
                  className: "bg-white border-2 border-gray-200 px-4 py-4 rounded-xl hover:border-blue-600 hover:shadow-lg transition group",
                  children: [
                    /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
                      /* @__PURE__ */ jsx("span", { className: "font-medium text-gray-900 group-hover:text-blue-600", children: neighbor.name }),
                      /* @__PURE__ */ jsx(MapPin, { className: "w-4 h-4 text-gray-400 group-hover:text-blue-600" })
                    ] }),
                    /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-500 mt-1", children: "Taxi conventionné CPAM" })
                  ]
                },
                neighbor.slug
              )) })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "mb-6", children: [
              /* @__PURE__ */ jsxs("h4", { className: "font-semibold text-lg mb-4 text-gray-900", children: [
                "Autres villes du ",
                department.name
              ] }),
              /* @__PURE__ */ jsx("div", { className: "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2", children: allNearbyCities.map((neighbor) => /* @__PURE__ */ jsx(
                Link,
                {
                  to: `/${departmentSlug}/${neighbor.slug}`,
                  className: "text-sm text-blue-600 hover:text-blue-800 hover:underline font-medium",
                  children: neighbor.name
                },
                neighbor.slug
              )) })
            ] }),
            /* @__PURE__ */ jsx("div", { className: "border-t border-gray-300 pt-6 mt-6", children: /* @__PURE__ */ jsx("div", { className: "bg-white rounded-xl p-6 shadow-md", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4", children: [
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsxs("h4", { className: "font-bold text-lg text-gray-900 mb-2", children: [
                  "Toutes nos destinations dans le ",
                  department.name
                ] }),
                /* @__PURE__ */ jsx("p", { className: "text-gray-600 text-sm", children: "Découvrez l'ensemble des villes desservies par notre service de taxi conventionné" })
              ] }),
              /* @__PURE__ */ jsxs(
                Link,
                {
                  to: `/${departmentSlug}`,
                  className: "inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold transition shadow-lg hover:shadow-xl whitespace-nowrap",
                  children: [
                    /* @__PURE__ */ jsx(MapPin, { className: "w-5 h-5" }),
                    "Voir toutes les villes"
                  ]
                }
              )
            ] }) }) })
          ] }),
          /* @__PURE__ */ jsxs("section", { className: "border-t pt-8", children: [
            /* @__PURE__ */ jsx("h3", { className: "text-2xl font-bold mb-4", children: "Services complémentaires" }),
            /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [
              /* @__PURE__ */ jsxs(
                Link,
                {
                  to: "/taxis-gares-parisiennes",
                  className: "border rounded-xl p-5 hover:border-blue-600 hover:shadow-lg transition",
                  children: [
                    /* @__PURE__ */ jsx(Brain, { className: "text-blue-600 w-6 h-6 mb-2" }),
                    /* @__PURE__ */ jsx("h4", { className: "font-bold mb-1", children: "Taxis Gares Parisiennes" }),
                    /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-600", children: "Transferts vers toutes les gares de Paris" })
                  ]
                }
              ),
              /* @__PURE__ */ jsxs(
                Link,
                {
                  to: "/taxis-aeroports-parisiens",
                  className: "border rounded-xl p-5 hover:border-blue-600 hover:shadow-lg transition",
                  children: [
                    /* @__PURE__ */ jsx(Plane, { className: "text-blue-600 w-6 h-6 mb-2" }),
                    /* @__PURE__ */ jsx("h4", { className: "font-bold mb-1", children: "Taxis Aéroports Parisiens" }),
                    /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-600", children: "CDG, Orly, Beauvais pour raisons médicales" })
                  ]
                }
              ),
              /* @__PURE__ */ jsxs(
                Link,
                {
                  to: "/reservation-taxi-vsl",
                  className: "border rounded-xl p-5 hover:border-blue-600 hover:shadow-lg transition bg-blue-50",
                  children: [
                    /* @__PURE__ */ jsx(Car, { className: "text-blue-600 w-6 h-6 mb-2" }),
                    /* @__PURE__ */ jsx("h4", { className: "font-bold mb-1", children: "Réserver un taxi VSL" }),
                    /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-600", children: "Réservation en ligne rapide et simple" })
                  ]
                }
              ),
              /* @__PURE__ */ jsxs(
                Link,
                {
                  to: "/faq",
                  className: "border rounded-xl p-5 hover:border-blue-600 hover:shadow-lg transition",
                  children: [
                    /* @__PURE__ */ jsx(Shield, { className: "text-blue-600 w-6 h-6 mb-2" }),
                    /* @__PURE__ */ jsx("h4", { className: "font-bold mb-1", children: "Questions fréquentes" }),
                    /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-600", children: "Toutes les réponses sur le transport CPAM" })
                  ]
                }
              )
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "hidden lg:block", children: /* @__PURE__ */ jsxs("div", { className: "sticky top-24 space-y-6", children: [
          /* @__PURE__ */ jsxs("div", { className: "bg-blue-900 text-white p-8 rounded-3xl text-center shadow-2xl", children: [
            /* @__PURE__ */ jsxs("h4", { className: "text-xl font-bold mb-4", children: [
              "Réservation à ",
              city.name
            ] }),
            /* @__PURE__ */ jsx("p", { className: "text-blue-200 text-sm mb-6", children: "Service disponible 7j/7" }),
            /* @__PURE__ */ jsxs(
              "a",
              {
                href: "tel:+33650366491",
                className: "bg-white text-blue-900 font-bold py-4 px-6 rounded-xl inline-flex items-center gap-2 hover:bg-blue-50 transition shadow-lg hover:shadow-xl mb-4 w-full justify-center",
                children: [
                  /* @__PURE__ */ jsx(Phone, { className: "w-5 h-5" }),
                  "06 50 36 64 91"
                ]
              }
            ),
            /* @__PURE__ */ jsxs(
              Link,
              {
                to: "/reservation-taxi-vsl",
                className: "bg-blue-700 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-xl inline-flex items-center gap-2 transition w-full justify-center",
                children: [
                  /* @__PURE__ */ jsx(Calendar, { className: "w-5 h-5" }),
                  "Réserver en ligne"
                ]
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "bg-white border-2 border-blue-200 p-6 rounded-2xl shadow-lg", children: [
            /* @__PURE__ */ jsxs("h5", { className: "font-bold text-gray-900 mb-3 flex items-center gap-2", children: [
              /* @__PURE__ */ jsx(MapPin, { className: "text-blue-600 w-5 h-5" }),
              "Zones desservies"
            ] }),
            /* @__PURE__ */ jsxs("ul", { className: "space-y-2 text-sm text-gray-700", children: [
              /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsxs(
                Link,
                {
                  to: `/${departmentSlug}`,
                  className: "hover:text-blue-600 hover:underline flex items-center gap-2",
                  children: [
                    /* @__PURE__ */ jsx("span", { className: "w-1.5 h-1.5 bg-blue-600 rounded-full" }),
                    department.name
                  ]
                }
              ) }),
              /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsxs(
                Link,
                {
                  to: "/zones-desservies",
                  className: "hover:text-blue-600 hover:underline flex items-center gap-2",
                  children: [
                    /* @__PURE__ */ jsx("span", { className: "w-1.5 h-1.5 bg-blue-600 rounded-full" }),
                    "Toute l'Île-de-France"
                  ]
                }
              ) }),
              /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsxs(
                Link,
                {
                  to: "/taxis-aeroports-parisiens",
                  className: "hover:text-blue-600 hover:underline flex items-center gap-2",
                  children: [
                    /* @__PURE__ */ jsx("span", { className: "w-1.5 h-1.5 bg-blue-600 rounded-full" }),
                    "Aéroports parisiens"
                  ]
                }
              ) }),
              /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsxs(
                Link,
                {
                  to: "/taxis-gares-parisiennes",
                  className: "hover:text-blue-600 hover:underline flex items-center gap-2",
                  children: [
                    /* @__PURE__ */ jsx("span", { className: "w-1.5 h-1.5 bg-blue-600 rounded-full" }),
                    "Gares parisiennes"
                  ]
                }
              ) })
            ] })
          ] })
        ] }) })
      ] })
    ] })
  ] });
}
function AirportTransfer() {
  const [formData, setFormData] = useState({
    nom: "",
    prenom: "",
    telephone: "",
    email: "",
    adresse_depart: "",
    adresse_arrivee: "",
    date_trajet: "",
    heure_trajet: "",
    numero_vol: "",
    nombre_passagers: 1,
    nombre_bagages: 1,
    informations_supplementaires: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [error, setError] = useState("");
  const [distance, setDistance] = useState(null);
  const [durationMinutes, setDurationMinutes] = useState(null);
  const [isCalculating, setIsCalculating] = useState(false);
  const [coordsDepart, setCoordsDepart] = useState(null);
  const [coordsArrivee, setCoordsArrivee] = useState(null);
  const apiKey = void 0;
  useEffect(() => {
    const calculateDistance = async () => {
      if (coordsDepart && coordsArrivee) {
        setIsCalculating(true);
        setError("");
        try {
          const result = await calculateRoute(
            coordsDepart.lat,
            coordsDepart.lng,
            coordsArrivee.lat,
            coordsArrivee.lng,
            apiKey,
            formData.date_trajet,
            formData.heure_trajet
          );
          if (result) {
            setDistance(result.distance_km);
            setDurationMinutes(result.duree_minutes);
          } else {
            setError("Impossible de calculer la distance");
          }
        } catch (err) {
          console.error("Error calculating distance:", err);
          setError("Erreur lors du calcul de distance");
        } finally {
          setIsCalculating(false);
        }
      }
    };
    const timeoutId = setTimeout(calculateDistance, 500);
    return () => clearTimeout(timeoutId);
  }, [coordsDepart, coordsArrivee, apiKey, formData.date_trajet, formData.heure_trajet]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");
    try {
      const emailData = {
        nom: formData.nom,
        prenom: formData.prenom,
        telephone: formData.telephone,
        email: formData.email,
        adresse_depart: formData.adresse_depart,
        adresse_arrivee: formData.adresse_arrivee,
        date_rdv: formData.date_trajet,
        heure_rdv: formData.heure_trajet,
        nombre_passagers: formData.nombre_passagers,
        nombre_bagages: formData.nombre_bagages,
        numero_vol: formData.numero_vol || "",
        numero_train: "",
        distance_km: distance || 0,
        duree_min: durationMinutes || 0,
        message: formData.informations_supplementaires || "",
        type_trajet: "aeroport"
      };
      const apiUrl = `${"https://qwsgtmzpirrbnmcbdvue.supabase.co"}/functions/v1/send-reservation-email`;
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF3c2d0bXpwaXJyYm5tY2JkdnVlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODAyNDUzMjQsImV4cCI6MjA5NTgyMTMyNH0.RFb45xZjY3pDV4QWgr9-ASta84bX09fIcbv7ZZlY_mk"}`
        },
        body: JSON.stringify(emailData)
      });
      if (!response.ok) {
        throw new Error("Erreur lors de l'envoi de la réservation");
      }
      setSubmitSuccess(true);
      setFormData({
        nom: "",
        prenom: "",
        telephone: "",
        email: "",
        adresse_depart: "",
        adresse_arrivee: "",
        date_trajet: "",
        heure_trajet: "",
        numero_vol: "",
        nombre_passagers: 1,
        nombre_bagages: 1,
        informations_supplementaires: ""
      });
      setCoordsDepart(null);
      setCoordsArrivee(null);
      setDistance(null);
      setDurationMinutes(null);
      setTimeout(() => setSubmitSuccess(false), 5e3);
    } catch (err) {
      console.error("Error submitting airport transfer:", err);
      setError("Une erreur est survenue. Veuillez réessayer.");
    } finally {
      setIsSubmitting(false);
    }
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };
  const jsonLD = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Transfert Aéroport - Taxi VSL Paris",
    "description": "Réservez votre transfert vers les aéroports de Paris (CDG, Orly, Beauvais). Service disponible 24/7.",
    "url": "https://www.taxisparis-conventionnes.fr/taxis-aeroports-parisiens"
  };
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(
      SEOHead,
      {
        title: "Transfert Aéroport Paris | Taxi CDG, Orly, Beauvais - 24/7",
        description: "Transfert taxi et VSL vers les aéroports de Paris : Charles de Gaulle (CDG), Orly et Beauvais. Réservation en ligne, tarifs forfaitaires, service 24h/24.",
        keywords: ["taxi aéroport CDG", "transfert Orly", "taxi Beauvais", "navette aéroport Paris", "transport aéroport Roissy"],
        canonical: "https://www.taxisparis-conventionnes.fr/taxis-aeroports-parisiens",
        jsonLD
      }
    ),
    /* @__PURE__ */ jsx("div", { className: "py-12 bg-gray-50", children: /* @__PURE__ */ jsx("div", { className: "container mx-auto px-4", children: /* @__PURE__ */ jsxs("div", { className: "max-w-4xl mx-auto", children: [
      /* @__PURE__ */ jsxs("div", { className: "text-center mb-8", children: [
        /* @__PURE__ */ jsx("div", { className: "inline-flex items-center justify-center w-20 h-20 bg-blue-100 rounded-full mb-4", children: /* @__PURE__ */ jsx(Plane, { className: "text-blue-600", size: 40 }) }),
        /* @__PURE__ */ jsx("h1", { className: "text-4xl font-bold text-gray-800 mb-4", children: "Transfert Gare et Aéroport" }),
        /* @__PURE__ */ jsx("p", { className: "text-lg text-gray-600", children: "Réservez votre transfert vers les gares et aéroports" })
      ] }),
      submitSuccess && /* @__PURE__ */ jsxs("div", { className: "bg-green-50 border border-green-200 rounded-lg p-4 mb-6 flex items-center gap-3", children: [
        /* @__PURE__ */ jsx(CheckCircle, { className: "text-green-600", size: 24 }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("p", { className: "font-semibold text-green-800", children: "Votre réservation a bien été envoyée." }),
          /* @__PURE__ */ jsx("p", { className: "text-sm text-green-700", children: "Nous vous contacterons rapidement." })
        ] })
      ] }),
      error && /* @__PURE__ */ jsx("div", { className: "bg-red-50 border border-red-200 rounded-lg p-4 mb-6", children: /* @__PURE__ */ jsx("p", { className: "text-red-800", children: error }) }),
      /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-lg shadow-lg p-8 mb-8", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-2xl font-bold text-gray-800 mb-4 text-center", children: "Forfaits Taxis Parisiens vers les Aéroports" }),
        /* @__PURE__ */ jsx("p", { className: "text-center text-gray-600 mb-8 max-w-3xl mx-auto", children: "Les tarifs forfaitaires réglementés pour les taxis parisiens varient selon la zone de départ (rive droite ou rive gauche de la Seine)" }),
        /* @__PURE__ */ jsxs("div", { className: "grid md:grid-cols-2 gap-8 mb-8", children: [
          /* @__PURE__ */ jsxs("div", { className: "border-2 border-blue-200 rounded-xl p-6 bg-blue-50", children: [
            /* @__PURE__ */ jsxs("h3", { className: "text-xl font-bold text-gray-800 mb-4 flex items-center gap-2", children: [
              /* @__PURE__ */ jsx(MapPin, { className: "text-blue-600", size: 24 }),
              "Rive Droite"
            ] }),
            /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-600 mb-4", children: "Arrondissements: 1er, 2e, 3e, 4e, 8e, 9e, 10e, 11e, 12e, 16e, 17e, 18e, 19e, 20e" }),
            /* @__PURE__ */ jsxs("div", { className: "space-y-3", children: [
              /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-lg p-4 flex items-center justify-between", children: [
                /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
                  /* @__PURE__ */ jsx(Plane, { className: "text-blue-600", size: 24 }),
                  /* @__PURE__ */ jsxs("div", { children: [
                    /* @__PURE__ */ jsx("p", { className: "font-semibold text-gray-800", children: "CDG" }),
                    /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-500", children: "Charles de Gaulle" })
                  ] })
                ] }),
                /* @__PURE__ */ jsx("p", { className: "text-2xl font-bold text-blue-600", children: "56€" })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-lg p-4 flex items-center justify-between", children: [
                /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
                  /* @__PURE__ */ jsx(Plane, { className: "text-blue-600", size: 24 }),
                  /* @__PURE__ */ jsxs("div", { children: [
                    /* @__PURE__ */ jsx("p", { className: "font-semibold text-gray-800", children: "Orly" }),
                    /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-500", children: "Aéroport d'Orly" })
                  ] })
                ] }),
                /* @__PURE__ */ jsx("p", { className: "text-2xl font-bold text-blue-600", children: "45€" })
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "border-2 border-green-200 rounded-xl p-6 bg-green-50", children: [
            /* @__PURE__ */ jsxs("h3", { className: "text-xl font-bold text-gray-800 mb-4 flex items-center gap-2", children: [
              /* @__PURE__ */ jsx(MapPin, { className: "text-green-600", size: 24 }),
              "Rive Gauche"
            ] }),
            /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-600 mb-4", children: "Arrondissements: 5e, 6e, 7e, 13e, 14e, 15e" }),
            /* @__PURE__ */ jsxs("div", { className: "space-y-3", children: [
              /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-lg p-4 flex items-center justify-between", children: [
                /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
                  /* @__PURE__ */ jsx(Plane, { className: "text-green-600", size: 24 }),
                  /* @__PURE__ */ jsxs("div", { children: [
                    /* @__PURE__ */ jsx("p", { className: "font-semibold text-gray-800", children: "CDG" }),
                    /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-500", children: "Charles de Gaulle" })
                  ] })
                ] }),
                /* @__PURE__ */ jsx("p", { className: "text-2xl font-bold text-green-600", children: "65€" })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-lg p-4 flex items-center justify-between", children: [
                /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
                  /* @__PURE__ */ jsx(Plane, { className: "text-green-600", size: 24 }),
                  /* @__PURE__ */ jsxs("div", { children: [
                    /* @__PURE__ */ jsx("p", { className: "font-semibold text-gray-800", children: "Orly" }),
                    /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-500", children: "Aéroport d'Orly" })
                  ] })
                ] }),
                /* @__PURE__ */ jsx("p", { className: "text-2xl font-bold text-green-600", children: "36€" })
              ] })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "bg-gray-50 rounded-lg p-6 border border-gray-200", children: [
          /* @__PURE__ */ jsxs("h4", { className: "font-semibold text-gray-800 mb-3 flex items-center gap-2", children: [
            /* @__PURE__ */ jsx(Plane, { className: "text-gray-600", size: 20 }),
            "Autres destinations"
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-2 text-sm text-gray-600", children: [
            /* @__PURE__ */ jsxs("p", { children: [
              /* @__PURE__ */ jsx("strong", { children: "Beauvais-Tillé:" }),
              " Pas de forfait - Prix au compteur (environ 120-150€)"
            ] }),
            /* @__PURE__ */ jsxs("p", { children: [
              /* @__PURE__ */ jsx("strong", { children: "Le Bourget:" }),
              " Pas de forfait - Prix au compteur"
            ] }),
            /* @__PURE__ */ jsxs("p", { className: "mt-4 pt-4 border-t border-gray-300 text-xs", children: [
              /* @__PURE__ */ jsx("strong", { children: "Note:" }),
              " Ces forfaits sont réglementés et incluent tous les frais. Les suppléments (bagages, 5e passager, etc.) restent applicables selon la réglementation en vigueur."
            ] })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("form", { onSubmit: handleSubmit, className: "bg-white rounded-lg shadow-lg p-8", children: [
        /* @__PURE__ */ jsxs("div", { className: "grid md:grid-cols-2 gap-6 mb-6", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700 mb-2", children: "Nom *" }),
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "text",
                name: "nom",
                value: formData.nom,
                onChange: handleChange,
                required: true,
                className: "w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700 mb-2", children: "Prénom *" }),
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "text",
                name: "prenom",
                value: formData.prenom,
                onChange: handleChange,
                required: true,
                className: "w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700 mb-2", children: "Téléphone *" }),
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "tel",
                name: "telephone",
                value: formData.telephone,
                onChange: handleChange,
                required: true,
                className: "w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700 mb-2", children: "Email *" }),
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "email",
                name: "email",
                value: formData.email,
                onChange: handleChange,
                required: true,
                className: "w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-4 mb-6", children: [
          /* @__PURE__ */ jsx(
            AutocompleteInput,
            {
              label: "Adresse de départ",
              value: formData.adresse_depart,
              placeholder: "Ex: Aéroport Charles de Gaulle, Roissy",
              required: true,
              apiKey,
              onAddressSelect: (address, lat, lng) => {
                setFormData((prev) => ({ ...prev, adresse_depart: address }));
                setCoordsDepart({ lat, lng });
              },
              onInputChange: (value) => {
                setFormData((prev) => ({ ...prev, adresse_depart: value }));
                setCoordsDepart(null);
              },
              isValidated: coordsDepart !== null
            }
          ),
          /* @__PURE__ */ jsx(
            AutocompleteInput,
            {
              label: "Adresse d'arrivée",
              value: formData.adresse_arrivee,
              placeholder: "Ex: 10 Rue de Rivoli, Paris",
              required: true,
              apiKey,
              onAddressSelect: (address, lat, lng) => {
                setFormData((prev) => ({ ...prev, adresse_arrivee: address }));
                setCoordsArrivee({ lat, lng });
              },
              onInputChange: (value) => {
                setFormData((prev) => ({ ...prev, adresse_arrivee: value }));
                setCoordsArrivee(null);
              },
              isValidated: coordsArrivee !== null
            }
          )
        ] }),
        distance !== null && durationMinutes !== null && /* @__PURE__ */ jsxs("div", { className: "mb-6", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 mb-4", children: [
            /* @__PURE__ */ jsx("div", { className: "bg-orange-100 p-2 rounded-lg", children: /* @__PURE__ */ jsx(Gauge, { className: "text-orange-600", size: 20 }) }),
            /* @__PURE__ */ jsx("h3", { className: "text-lg font-bold text-gray-800", children: "Informations du trajet" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
            /* @__PURE__ */ jsxs("div", { className: "bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-5 border border-blue-200 flex flex-col items-center text-center", children: [
              /* @__PURE__ */ jsx("div", { className: "bg-blue-500 p-2 rounded-lg mb-2", children: /* @__PURE__ */ jsx(Gauge, { className: "text-white", size: 24 }) }),
              /* @__PURE__ */ jsxs("p", { className: "text-2xl font-bold text-gray-800 mb-1", children: [
                distance,
                " km"
              ] }),
              /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-600", children: "Distance réelle" })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl p-5 border border-orange-200 flex flex-col items-center text-center", children: [
              /* @__PURE__ */ jsx("div", { className: "bg-orange-500 p-2 rounded-lg mb-2", children: /* @__PURE__ */ jsx(Timer, { className: "text-white", size: 24 }) }),
              /* @__PURE__ */ jsxs("p", { className: "text-2xl font-bold text-gray-800 mb-1", children: [
                durationMinutes,
                " min"
              ] }),
              /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-600", children: "Durée estimée" })
            ] })
          ] })
        ] }),
        isCalculating && /* @__PURE__ */ jsx("div", { className: "mb-6 p-4 bg-gray-50 rounded-lg border border-gray-200 text-center text-gray-600", children: "Calcul de l'itinéraire en cours..." }),
        /* @__PURE__ */ jsxs("div", { className: "grid md:grid-cols-2 gap-6 mb-6", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsxs("label", { className: "block text-sm font-medium text-gray-700 mb-2", children: [
              /* @__PURE__ */ jsx(Calendar, { className: "inline mr-2", size: 16 }),
              "Date du trajet *"
            ] }),
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "date",
                name: "date_trajet",
                value: formData.date_trajet,
                onChange: handleChange,
                required: true,
                min: (/* @__PURE__ */ new Date()).toISOString().split("T")[0],
                className: "w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsxs("label", { className: "block text-sm font-medium text-gray-700 mb-2", children: [
              /* @__PURE__ */ jsx(Clock, { className: "inline mr-2", size: 16 }),
              "Heure du trajet *"
            ] }),
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "time",
                name: "heure_trajet",
                value: formData.heure_trajet,
                onChange: handleChange,
                required: true,
                className: "w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "mb-6", children: [
          /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700 mb-2", children: "Numéro de vol" }),
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "text",
              name: "numero_vol",
              value: formData.numero_vol,
              onChange: handleChange,
              placeholder: "Ex: AF1234",
              className: "w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "grid md:grid-cols-2 gap-6 mb-6", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsxs("label", { className: "block text-sm font-medium text-gray-700 mb-2", children: [
              /* @__PURE__ */ jsx(Users, { className: "inline mr-2", size: 16 }),
              "Nombre de passagers *"
            ] }),
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "number",
                name: "nombre_passagers",
                value: formData.nombre_passagers,
                onChange: handleChange,
                required: true,
                min: "1",
                max: "8",
                className: "w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsxs("label", { className: "block text-sm font-medium text-gray-700 mb-2", children: [
              /* @__PURE__ */ jsx(Luggage, { className: "inline mr-2", size: 16 }),
              "Nombre de bagages *"
            ] }),
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "number",
                name: "nombre_bagages",
                value: formData.nombre_bagages,
                onChange: handleChange,
                required: true,
                min: "0",
                max: "10",
                className: "w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "mb-6", children: [
          /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700 mb-2", children: "Informations supplémentaires" }),
          /* @__PURE__ */ jsx(
            "textarea",
            {
              name: "informations_supplementaires",
              value: formData.informations_supplementaires,
              onChange: handleChange,
              rows: 4,
              placeholder: "Demandes particulières, besoins spéciaux...",
              className: "w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            }
          )
        ] }),
        /* @__PURE__ */ jsx(
          "button",
          {
            type: "submit",
            disabled: isSubmitting,
            className: "w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition disabled:bg-gray-400 disabled:cursor-not-allowed",
            children: isSubmitting ? "Envoi en cours..." : "Confirmer la réservation"
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6", children: [
        /* @__PURE__ */ jsx("h3", { className: "font-semibold text-blue-900 mb-3", children: "Besoin d'aide ?" }),
        /* @__PURE__ */ jsx("p", { className: "text-blue-800 mb-4", children: "Notre équipe est disponible 24h/24 pour répondre à vos questions." }),
        /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap gap-4", children: [
          /* @__PURE__ */ jsxs(
            "a",
            {
              href: "tel:+33650366491",
              className: "inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition",
              children: [
                /* @__PURE__ */ jsx(Phone, { size: 18 }),
                "06 50 36 64 91"
              ]
            }
          ),
          /* @__PURE__ */ jsxs(
            "a",
            {
              href: "mailto:contact@taxisparis-conventionnes.fr",
              className: "inline-flex items-center gap-2 border-2 border-blue-600 text-blue-600 px-6 py-2 rounded-lg hover:bg-blue-600 hover:text-white transition",
              children: [
                /* @__PURE__ */ jsx(Mail, { size: 18 }),
                "Email"
              ]
            }
          )
        ] })
      ] })
    ] }) }) })
  ] });
}
function StationTransfer() {
  const [formData, setFormData] = useState({
    nom: "",
    prenom: "",
    telephone: "",
    email: "",
    adresse_depart: "",
    adresse_arrivee: "",
    date_trajet: "",
    heure_trajet: "",
    numero_train: "",
    nombre_passagers: 1,
    nombre_bagages: 1,
    informations_supplementaires: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [error, setError] = useState("");
  const [distance, setDistance] = useState(null);
  const [durationMinutes, setDurationMinutes] = useState(null);
  const [isCalculating, setIsCalculating] = useState(false);
  const [coordsDepart, setCoordsDepart] = useState(null);
  const [coordsArrivee, setCoordsArrivee] = useState(null);
  const apiKey = void 0;
  useEffect(() => {
    const calculateDistance = async () => {
      if (coordsDepart && coordsArrivee) {
        setIsCalculating(true);
        setError("");
        try {
          const result = await calculateRoute(
            coordsDepart.lat,
            coordsDepart.lng,
            coordsArrivee.lat,
            coordsArrivee.lng,
            apiKey,
            formData.date_trajet,
            formData.heure_trajet
          );
          if (result) {
            setDistance(result.distance_km);
            setDurationMinutes(result.duree_minutes);
          } else {
            setError("Impossible de calculer la distance");
          }
        } catch (err) {
          console.error("Error calculating distance:", err);
          setError("Erreur lors du calcul de distance");
        } finally {
          setIsCalculating(false);
        }
      }
    };
    const timeoutId = setTimeout(calculateDistance, 500);
    return () => clearTimeout(timeoutId);
  }, [coordsDepart, coordsArrivee, apiKey, formData.date_trajet, formData.heure_trajet]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");
    try {
      const emailData = {
        nom: formData.nom,
        prenom: formData.prenom,
        telephone: formData.telephone,
        email: formData.email,
        adresse_depart: formData.adresse_depart,
        adresse_arrivee: formData.adresse_arrivee,
        date_rdv: formData.date_trajet,
        heure_rdv: formData.heure_trajet,
        nombre_passagers: formData.nombre_passagers,
        nombre_bagages: formData.nombre_bagages,
        numero_vol: "",
        numero_train: formData.numero_train || "",
        distance_km: distance || 0,
        duree_min: durationMinutes || 0,
        message: formData.informations_supplementaires || "",
        type_trajet: "gare"
      };
      const apiUrl = `${"https://qwsgtmzpirrbnmcbdvue.supabase.co"}/functions/v1/send-reservation-email`;
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF3c2d0bXpwaXJyYm5tY2JkdnVlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODAyNDUzMjQsImV4cCI6MjA5NTgyMTMyNH0.RFb45xZjY3pDV4QWgr9-ASta84bX09fIcbv7ZZlY_mk"}`
        },
        body: JSON.stringify(emailData)
      });
      if (!response.ok) {
        throw new Error("Erreur lors de l'envoi de la réservation");
      }
      setSubmitSuccess(true);
      setFormData({
        nom: "",
        prenom: "",
        telephone: "",
        email: "",
        adresse_depart: "",
        adresse_arrivee: "",
        date_trajet: "",
        heure_trajet: "",
        numero_train: "",
        nombre_passagers: 1,
        nombre_bagages: 1,
        informations_supplementaires: ""
      });
      setCoordsDepart(null);
      setCoordsArrivee(null);
      setDistance(null);
      setDurationMinutes(null);
      setTimeout(() => setSubmitSuccess(false), 5e3);
    } catch (err) {
      console.error("Error submitting station transfer:", err);
      setError("Une erreur est survenue. Veuillez réessayer.");
    } finally {
      setIsSubmitting(false);
    }
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };
  const jsonLD = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Transfert Gare - Taxi VSL Paris",
    "description": "Réservez votre transfert vers les gares de Paris. Service disponible 24/7.",
    "url": "https://www.taxisparis-conventionnes.fr/taxis-gares-parisiennes"
  };
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(
      SEOHead,
      {
        title: "Transfert Gare Paris | Taxi Gare du Nord, Montparnasse, Lyon - 24/7",
        description: "Transfert taxi et VSL vers les gares de Paris : Gare du Nord, Gare de Lyon, Montparnasse, Saint-Lazare. Réservation en ligne, service 24h/24.",
        keywords: ["taxi gare du Nord", "transfert gare de Lyon", "taxi Montparnasse", "navette gare Paris", "transport gare"],
        canonical: "https://www.taxisparis-conventionnes.fr/taxis-gares-parisiennes",
        jsonLD
      }
    ),
    /* @__PURE__ */ jsx("div", { className: "py-12 bg-gray-50", children: /* @__PURE__ */ jsx("div", { className: "container mx-auto px-4", children: /* @__PURE__ */ jsxs("div", { className: "max-w-4xl mx-auto", children: [
      /* @__PURE__ */ jsxs("div", { className: "text-center mb-8", children: [
        /* @__PURE__ */ jsx("div", { className: "inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-4", children: /* @__PURE__ */ jsx(Train, { className: "text-green-600", size: 40 }) }),
        /* @__PURE__ */ jsx("h1", { className: "text-4xl font-bold text-gray-800 mb-4", children: "Transfert Gare et Aéroport" }),
        /* @__PURE__ */ jsx("p", { className: "text-lg text-gray-600", children: "Réservez votre transfert vers les gares et aéroports" })
      ] }),
      submitSuccess && /* @__PURE__ */ jsxs("div", { className: "bg-green-50 border border-green-200 rounded-lg p-4 mb-6 flex items-center gap-3", children: [
        /* @__PURE__ */ jsx(CheckCircle, { className: "text-green-600", size: 24 }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("p", { className: "font-semibold text-green-800", children: "Votre réservation a bien été envoyée." }),
          /* @__PURE__ */ jsx("p", { className: "text-sm text-green-700", children: "Nous vous contacterons rapidement." })
        ] })
      ] }),
      error && /* @__PURE__ */ jsx("div", { className: "bg-red-50 border border-red-200 rounded-lg p-4 mb-6", children: /* @__PURE__ */ jsx("p", { className: "text-red-800", children: error }) }),
      /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-lg shadow-lg p-8 mb-8", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-2xl font-bold text-gray-800 mb-4 text-center", children: "Forfaits Taxis Parisiens vers les Aéroports" }),
        /* @__PURE__ */ jsx("p", { className: "text-center text-gray-600 mb-8 max-w-3xl mx-auto", children: "Les tarifs forfaitaires réglementés pour les taxis parisiens varient selon la zone de départ (rive droite ou rive gauche de la Seine)" }),
        /* @__PURE__ */ jsxs("div", { className: "grid md:grid-cols-2 gap-8 mb-8", children: [
          /* @__PURE__ */ jsxs("div", { className: "border-2 border-green-200 rounded-xl p-6 bg-green-50", children: [
            /* @__PURE__ */ jsxs("h3", { className: "text-xl font-bold text-gray-800 mb-4 flex items-center gap-2", children: [
              /* @__PURE__ */ jsx(MapPin, { className: "text-green-600", size: 24 }),
              "Rive Droite"
            ] }),
            /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-600 mb-4", children: "Arrondissements: 1er, 2e, 3e, 4e, 8e, 9e, 10e, 11e, 12e, 16e, 17e, 18e, 19e, 20e" }),
            /* @__PURE__ */ jsxs("div", { className: "space-y-3", children: [
              /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-lg p-4 flex items-center justify-between", children: [
                /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
                  /* @__PURE__ */ jsx(Plane, { className: "text-green-600", size: 24 }),
                  /* @__PURE__ */ jsxs("div", { children: [
                    /* @__PURE__ */ jsx("p", { className: "font-semibold text-gray-800", children: "CDG" }),
                    /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-500", children: "Charles de Gaulle" })
                  ] })
                ] }),
                /* @__PURE__ */ jsx("p", { className: "text-2xl font-bold text-green-600", children: "56€" })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-lg p-4 flex items-center justify-between", children: [
                /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
                  /* @__PURE__ */ jsx(Plane, { className: "text-green-600", size: 24 }),
                  /* @__PURE__ */ jsxs("div", { children: [
                    /* @__PURE__ */ jsx("p", { className: "font-semibold text-gray-800", children: "Orly" }),
                    /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-500", children: "Aéroport d'Orly" })
                  ] })
                ] }),
                /* @__PURE__ */ jsx("p", { className: "text-2xl font-bold text-green-600", children: "45€" })
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "border-2 border-orange-200 rounded-xl p-6 bg-orange-50", children: [
            /* @__PURE__ */ jsxs("h3", { className: "text-xl font-bold text-gray-800 mb-4 flex items-center gap-2", children: [
              /* @__PURE__ */ jsx(MapPin, { className: "text-orange-600", size: 24 }),
              "Rive Gauche"
            ] }),
            /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-600 mb-4", children: "Arrondissements: 5e, 6e, 7e, 13e, 14e, 15e" }),
            /* @__PURE__ */ jsxs("div", { className: "space-y-3", children: [
              /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-lg p-4 flex items-center justify-between", children: [
                /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
                  /* @__PURE__ */ jsx(Plane, { className: "text-orange-600", size: 24 }),
                  /* @__PURE__ */ jsxs("div", { children: [
                    /* @__PURE__ */ jsx("p", { className: "font-semibold text-gray-800", children: "CDG" }),
                    /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-500", children: "Charles de Gaulle" })
                  ] })
                ] }),
                /* @__PURE__ */ jsx("p", { className: "text-2xl font-bold text-orange-600", children: "65€" })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-lg p-4 flex items-center justify-between", children: [
                /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
                  /* @__PURE__ */ jsx(Plane, { className: "text-orange-600", size: 24 }),
                  /* @__PURE__ */ jsxs("div", { children: [
                    /* @__PURE__ */ jsx("p", { className: "font-semibold text-gray-800", children: "Orly" }),
                    /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-500", children: "Aéroport d'Orly" })
                  ] })
                ] }),
                /* @__PURE__ */ jsx("p", { className: "text-2xl font-bold text-orange-600", children: "36€" })
              ] })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "bg-gray-50 rounded-lg p-6 border border-gray-200", children: [
          /* @__PURE__ */ jsxs("h4", { className: "font-semibold text-gray-800 mb-3 flex items-center gap-2", children: [
            /* @__PURE__ */ jsx(Plane, { className: "text-gray-600", size: 20 }),
            "Autres destinations"
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-2 text-sm text-gray-600", children: [
            /* @__PURE__ */ jsxs("p", { children: [
              /* @__PURE__ */ jsx("strong", { children: "Beauvais-Tillé:" }),
              " Pas de forfait - Prix au compteur (environ 120-150€)"
            ] }),
            /* @__PURE__ */ jsxs("p", { children: [
              /* @__PURE__ */ jsx("strong", { children: "Le Bourget:" }),
              " Pas de forfait - Prix au compteur"
            ] }),
            /* @__PURE__ */ jsxs("p", { className: "mt-4 pt-4 border-t border-gray-300 text-xs", children: [
              /* @__PURE__ */ jsx("strong", { children: "Note:" }),
              " Ces forfaits sont réglementés et incluent tous les frais. Les suppléments (bagages, 5e passager, etc.) restent applicables selon la réglementation en vigueur."
            ] })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("form", { onSubmit: handleSubmit, className: "bg-white rounded-lg shadow-lg p-8", children: [
        /* @__PURE__ */ jsxs("div", { className: "grid md:grid-cols-2 gap-6 mb-6", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700 mb-2", children: "Nom *" }),
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "text",
                name: "nom",
                value: formData.nom,
                onChange: handleChange,
                required: true,
                className: "w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700 mb-2", children: "Prénom *" }),
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "text",
                name: "prenom",
                value: formData.prenom,
                onChange: handleChange,
                required: true,
                className: "w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700 mb-2", children: "Téléphone *" }),
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "tel",
                name: "telephone",
                value: formData.telephone,
                onChange: handleChange,
                required: true,
                className: "w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700 mb-2", children: "Email *" }),
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "email",
                name: "email",
                value: formData.email,
                onChange: handleChange,
                required: true,
                className: "w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-4 mb-6", children: [
          /* @__PURE__ */ jsx(
            AutocompleteInput,
            {
              label: "Adresse de départ",
              value: formData.adresse_depart,
              placeholder: "Ex: Gare du Nord, Paris",
              required: true,
              apiKey,
              onAddressSelect: (address, lat, lng) => {
                setFormData((prev) => ({ ...prev, adresse_depart: address }));
                setCoordsDepart({ lat, lng });
              },
              onInputChange: (value) => {
                setFormData((prev) => ({ ...prev, adresse_depart: value }));
                setCoordsDepart(null);
              },
              isValidated: coordsDepart !== null
            }
          ),
          /* @__PURE__ */ jsx(
            AutocompleteInput,
            {
              label: "Adresse d'arrivée",
              value: formData.adresse_arrivee,
              placeholder: "Ex: 25 Avenue des Champs-Élysées, Paris",
              required: true,
              apiKey,
              onAddressSelect: (address, lat, lng) => {
                setFormData((prev) => ({ ...prev, adresse_arrivee: address }));
                setCoordsArrivee({ lat, lng });
              },
              onInputChange: (value) => {
                setFormData((prev) => ({ ...prev, adresse_arrivee: value }));
                setCoordsArrivee(null);
              },
              isValidated: coordsArrivee !== null
            }
          )
        ] }),
        distance !== null && durationMinutes !== null && /* @__PURE__ */ jsxs("div", { className: "mb-6", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 mb-4", children: [
            /* @__PURE__ */ jsx("div", { className: "bg-orange-100 p-2 rounded-lg", children: /* @__PURE__ */ jsx(Gauge, { className: "text-orange-600", size: 20 }) }),
            /* @__PURE__ */ jsx("h3", { className: "text-lg font-bold text-gray-800", children: "Informations du trajet" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
            /* @__PURE__ */ jsxs("div", { className: "bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-5 border border-green-200 flex flex-col items-center text-center", children: [
              /* @__PURE__ */ jsx("div", { className: "bg-green-500 p-2 rounded-lg mb-2", children: /* @__PURE__ */ jsx(Gauge, { className: "text-white", size: 24 }) }),
              /* @__PURE__ */ jsxs("p", { className: "text-2xl font-bold text-gray-800 mb-1", children: [
                distance,
                " km"
              ] }),
              /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-600", children: "Distance réelle" })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl p-5 border border-orange-200 flex flex-col items-center text-center", children: [
              /* @__PURE__ */ jsx("div", { className: "bg-orange-500 p-2 rounded-lg mb-2", children: /* @__PURE__ */ jsx(Timer, { className: "text-white", size: 24 }) }),
              /* @__PURE__ */ jsxs("p", { className: "text-2xl font-bold text-gray-800 mb-1", children: [
                durationMinutes,
                " min"
              ] }),
              /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-600", children: "Durée estimée" })
            ] })
          ] })
        ] }),
        isCalculating && /* @__PURE__ */ jsx("div", { className: "mb-6 p-4 bg-gray-50 rounded-lg border border-gray-200 text-center text-gray-600", children: "Calcul de l'itinéraire en cours..." }),
        /* @__PURE__ */ jsxs("div", { className: "grid md:grid-cols-2 gap-6 mb-6", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsxs("label", { className: "block text-sm font-medium text-gray-700 mb-2", children: [
              /* @__PURE__ */ jsx(Calendar, { className: "inline mr-2", size: 16 }),
              "Date du trajet *"
            ] }),
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "date",
                name: "date_trajet",
                value: formData.date_trajet,
                onChange: handleChange,
                required: true,
                min: (/* @__PURE__ */ new Date()).toISOString().split("T")[0],
                className: "w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsxs("label", { className: "block text-sm font-medium text-gray-700 mb-2", children: [
              /* @__PURE__ */ jsx(Clock, { className: "inline mr-2", size: 16 }),
              "Heure de prise en charge *"
            ] }),
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "time",
                name: "heure_trajet",
                value: formData.heure_trajet,
                onChange: handleChange,
                required: true,
                className: "w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "mb-6", children: [
          /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700 mb-2", children: "Numéro de train" }),
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "text",
              name: "numero_train",
              value: formData.numero_train,
              onChange: handleChange,
              placeholder: "Ex: TGV 6123",
              className: "w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "grid md:grid-cols-2 gap-6 mb-6", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsxs("label", { className: "block text-sm font-medium text-gray-700 mb-2", children: [
              /* @__PURE__ */ jsx(Users, { className: "inline mr-2", size: 16 }),
              "Nombre de passagers *"
            ] }),
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "number",
                name: "nombre_passagers",
                value: formData.nombre_passagers,
                onChange: handleChange,
                required: true,
                min: "1",
                max: "8",
                className: "w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsxs("label", { className: "block text-sm font-medium text-gray-700 mb-2", children: [
              /* @__PURE__ */ jsx(Luggage, { className: "inline mr-2", size: 16 }),
              "Nombre de bagages *"
            ] }),
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "number",
                name: "nombre_bagages",
                value: formData.nombre_bagages,
                onChange: handleChange,
                required: true,
                min: "0",
                max: "10",
                className: "w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "mb-6", children: [
          /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700 mb-2", children: "Informations supplémentaires" }),
          /* @__PURE__ */ jsx(
            "textarea",
            {
              name: "informations_supplementaires",
              value: formData.informations_supplementaires,
              onChange: handleChange,
              rows: 4,
              placeholder: "Demandes particulières, besoins spéciaux...",
              className: "w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            }
          )
        ] }),
        /* @__PURE__ */ jsx(
          "button",
          {
            type: "submit",
            disabled: isSubmitting,
            className: "w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition disabled:bg-gray-400 disabled:cursor-not-allowed",
            children: isSubmitting ? "Envoi en cours..." : "Confirmer la réservation"
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "mt-8 bg-green-50 border border-green-200 rounded-lg p-6", children: [
        /* @__PURE__ */ jsx("h3", { className: "font-semibold text-green-900 mb-3", children: "Besoin d'aide ?" }),
        /* @__PURE__ */ jsx("p", { className: "text-green-800 mb-4", children: "Notre équipe est disponible 24h/24 pour répondre à vos questions." }),
        /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap gap-4", children: [
          /* @__PURE__ */ jsxs(
            "a",
            {
              href: "tel:+33650366491",
              className: "inline-flex items-center gap-2 bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition",
              children: [
                /* @__PURE__ */ jsx(Phone, { size: 18 }),
                "06 50 36 64 91"
              ]
            }
          ),
          /* @__PURE__ */ jsxs(
            "a",
            {
              href: "mailto:contact@taxisparis-conventionnes.fr",
              className: "inline-flex items-center gap-2 border-2 border-green-600 text-green-600 px-6 py-2 rounded-lg hover:bg-green-600 hover:text-white transition",
              children: [
                /* @__PURE__ */ jsx(Mail, { size: 18 }),
                "Email"
              ]
            }
          )
        ] })
      ] })
    ] }) }) })
  ] });
}
const AdminAuthContext = createContext(void 0);
function AdminAuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const checkSession = () => {
      const storedUser = localStorage.getItem("admin_user");
      if (storedUser) {
        try {
          setUser(JSON.parse(storedUser));
        } catch (e) {
          localStorage.removeItem("admin_user");
        }
      }
      setLoading(false);
    };
    checkSession();
  }, []);
  const signIn = async (email, password) => {
    const { data, error } = await supabase.rpc("admin_login", {
      p_email: email,
      p_password: password
    });
    if (error) throw error;
    if (!data || data.length === 0) {
      throw new Error("Invalid login credentials");
    }
    const adminUser = data[0];
    setUser(adminUser);
    localStorage.setItem("admin_user", JSON.stringify(adminUser));
  };
  const signOut = async () => {
    localStorage.removeItem("admin_user");
    setUser(null);
  };
  return /* @__PURE__ */ jsx(AdminAuthContext.Provider, { value: { user, loading, signIn, signOut }, children });
}
function useAdminAuth() {
  const context = useContext(AdminAuthContext);
  if (context === void 0) {
    throw new Error("useAdminAuth must be used within AdminAuthProvider");
  }
  return context;
}
function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { signIn } = useAdminAuth();
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await signIn(email, password);
      navigate("/admin/dashboard");
    } catch (err) {
      setError(err.message || "Erreur de connexion");
    } finally {
      setLoading(false);
    }
  };
  return /* @__PURE__ */ jsx("div", { className: "min-h-screen bg-gradient-to-br from-blue-600 via-blue-700 to-blue-900 flex items-center justify-center p-4", children: /* @__PURE__ */ jsx("div", { className: "max-w-md w-full", children: /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-2xl shadow-2xl p-8", children: [
    /* @__PURE__ */ jsxs("div", { className: "text-center mb-8", children: [
      /* @__PURE__ */ jsx("div", { className: "inline-block p-4 bg-blue-100 rounded-full mb-4", children: /* @__PURE__ */ jsx(Lock, { className: "text-blue-600", size: 40 }) }),
      /* @__PURE__ */ jsx("h1", { className: "text-3xl font-bold text-gray-800 mb-2", children: "Admin Panel" }),
      /* @__PURE__ */ jsx("p", { className: "text-gray-600", children: "Connexion administrateur" })
    ] }),
    error && /* @__PURE__ */ jsx("div", { className: "mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-800 text-sm", children: error }),
    /* @__PURE__ */ jsxs("form", { onSubmit: handleSubmit, className: "space-y-6", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsxs("label", { className: "block text-sm font-medium text-gray-700 mb-2", children: [
          /* @__PURE__ */ jsx(Mail, { className: "inline mr-2", size: 16 }),
          "Email"
        ] }),
        /* @__PURE__ */ jsx(
          "input",
          {
            type: "email",
            value: email,
            onChange: (e) => setEmail(e.target.value),
            required: true,
            className: "w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent",
            placeholder: "admin@example.com"
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsxs("label", { className: "block text-sm font-medium text-gray-700 mb-2", children: [
          /* @__PURE__ */ jsx(Lock, { className: "inline mr-2", size: 16 }),
          "Mot de passe"
        ] }),
        /* @__PURE__ */ jsx(
          "input",
          {
            type: "password",
            value: password,
            onChange: (e) => setPassword(e.target.value),
            required: true,
            className: "w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent",
            placeholder: "••••••••"
          }
        )
      ] }),
      /* @__PURE__ */ jsxs(
        "button",
        {
          type: "submit",
          disabled: loading,
          className: "w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center gap-2",
          children: [
            /* @__PURE__ */ jsx(LogIn, { size: 20 }),
            loading ? "Connexion..." : "Se connecter"
          ]
        }
      )
    ] })
  ] }) }) });
}
function AdminLayout({ children }) {
  const { user, signOut } = useAdminAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const handleSignOut = async () => {
    await signOut();
    navigate("/admin/login");
  };
  const menuItems2 = [
    { icon: LayoutDashboard, label: "Dashboard", path: "/admin/dashboard" },
    { icon: Calendar, label: "Réservations", path: "/admin/dashboard", anchor: "reservations" },
    { icon: BookOpen, label: "Blog", path: "/admin/blog" },
    { icon: HelpCircle, label: "FAQ", path: "/admin/faq" },
    { icon: Settings$1, label: "Paramètres", path: "/admin/settings" }
  ];
  return /* @__PURE__ */ jsxs("div", { className: "min-h-screen bg-gray-50 flex", children: [
    /* @__PURE__ */ jsxs("aside", { className: "hidden lg:flex w-64 bg-gradient-to-b from-gray-900 to-gray-800 text-white flex-col fixed h-screen", children: [
      /* @__PURE__ */ jsxs("div", { className: "p-6 border-b border-gray-700", children: [
        /* @__PURE__ */ jsx("h1", { className: "text-2xl font-bold", children: "Admin CMS" }),
        /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-400 mt-1", children: user == null ? void 0 : user.name })
      ] }),
      /* @__PURE__ */ jsx("nav", { className: "flex-1 p-4 space-y-2", children: menuItems2.map((item) => {
        const Icon = item.icon;
        const isActive = location.pathname === item.path;
        return /* @__PURE__ */ jsxs(
          Link,
          {
            to: item.path,
            className: `flex items-center gap-3 px-4 py-3 rounded-lg transition ${isActive ? "bg-blue-600 text-white" : "text-gray-300 hover:bg-gray-700 hover:text-white"}`,
            children: [
              /* @__PURE__ */ jsx(Icon, { size: 20 }),
              /* @__PURE__ */ jsx("span", { className: "font-medium", children: item.label })
            ]
          },
          item.path
        );
      }) }),
      /* @__PURE__ */ jsx("div", { className: "p-4 border-t border-gray-700", children: /* @__PURE__ */ jsxs(
        "button",
        {
          onClick: handleSignOut,
          className: "flex items-center gap-3 px-4 py-3 rounded-lg text-gray-300 hover:bg-red-600 hover:text-white transition w-full",
          children: [
            /* @__PURE__ */ jsx(LogOut, { size: 20 }),
            /* @__PURE__ */ jsx("span", { className: "font-medium", children: "Déconnexion" })
          ]
        }
      ) })
    ] }),
    /* @__PURE__ */ jsx("main", { className: "flex-1 overflow-auto lg:ml-64", children: /* @__PURE__ */ jsxs("div", { className: "p-4 sm:p-6 lg:p-8", children: [
      /* @__PURE__ */ jsxs("div", { className: "lg:hidden mb-6 pb-4 border-b", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("h2", { className: "text-xl font-bold text-gray-800", children: "Admin CMS" }),
            /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-600", children: user == null ? void 0 : user.name })
          ] }),
          /* @__PURE__ */ jsxs(
            "button",
            {
              onClick: handleSignOut,
              className: "flex items-center gap-2 px-3 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition text-sm",
              children: [
                /* @__PURE__ */ jsx(LogOut, { size: 16 }),
                "Déconnexion"
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsx("nav", { className: "grid grid-cols-2 gap-2 mt-4", children: menuItems2.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          return /* @__PURE__ */ jsxs(
            Link,
            {
              to: item.path,
              className: `flex items-center gap-2 px-3 py-2 rounded-lg transition text-sm ${isActive ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`,
              children: [
                /* @__PURE__ */ jsx(Icon, { size: 16 }),
                /* @__PURE__ */ jsx("span", { className: "font-medium", children: item.label })
              ]
            },
            item.path
          );
        }) })
      ] }),
      children
    ] }) })
  ] });
}
function Dashboard() {
  const navigate = useNavigate();
  const [stats, setStats] = useState({ blogPosts: 0, reservations: 0, reservationsToday: 0 });
  const [reservations, setReservations] = useState([]);
  const [recentPosts, setRecentPosts] = useState([]);
  const [filter, setFilter] = useState("all");
  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    const today = (/* @__PURE__ */ new Date()).toISOString().split("T")[0];
    const [postsCount, reservationsCount, todayCount, resData, postsData] = await Promise.all([
      supabase.from("blog_posts").select("*", { count: "exact", head: true }),
      supabase.from("reservations").select("*", { count: "exact", head: true }),
      supabase.from("reservations").select("*", { count: "exact", head: true }).gte("created_at", today),
      supabase.from("reservations").select("*").order("created_at", { ascending: false }).limit(50),
      supabase.from("blog_posts").select("id, title, published, updated_at").order("updated_at", { ascending: false }).limit(5)
    ]);
    setStats({
      blogPosts: postsCount.count || 0,
      reservations: reservationsCount.count || 0,
      reservationsToday: todayCount.count || 0
    });
    setReservations(resData.data || []);
    setRecentPosts(postsData.data || []);
  };
  const updateStatus = async (id, statut) => {
    await supabase.from("reservations").update({ statut }).eq("id", id);
    setReservations((prev) => prev.map((r) => r.id === id ? { ...r, statut } : r));
  };
  const deleteAllReservations = async () => {
    if (!window.confirm("Supprimer TOUTES les reservations ? Cette action est irreversible.")) return;
    await supabase.from("reservations").delete().neq("id", "00000000-0000-0000-0000-000000000000");
    setReservations([]);
    setStats((prev) => ({ ...prev, reservations: 0, reservationsToday: 0 }));
  };
  const filteredReservations = filter === "all" ? reservations : reservations.filter((r) => r.statut === filter);
  const getStatusBadge = (statut) => {
    switch (statut) {
      case "confirmed":
        return /* @__PURE__ */ jsxs("span", { className: "inline-flex items-center gap-1 px-2.5 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-700", children: [
          /* @__PURE__ */ jsx(CheckCircle, { size: 12 }),
          "Confirmee"
        ] });
      case "cancelled":
        return /* @__PURE__ */ jsxs("span", { className: "inline-flex items-center gap-1 px-2.5 py-1 text-xs font-semibold rounded-full bg-red-100 text-red-700", children: [
          /* @__PURE__ */ jsx(XCircle, { size: 12 }),
          "Annulee"
        ] });
      default:
        return /* @__PURE__ */ jsxs("span", { className: "inline-flex items-center gap-1 px-2.5 py-1 text-xs font-semibold rounded-full bg-amber-100 text-amber-700", children: [
          /* @__PURE__ */ jsx(AlertCircle, { size: 12 }),
          "En attente"
        ] });
    }
  };
  return /* @__PURE__ */ jsx(AdminLayout, { children: /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h1", { className: "text-2xl font-bold text-gray-900", children: "Tableau de bord" }),
        /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-500 mt-1", children: "Vue d'ensemble de votre activite" })
      ] }),
      /* @__PURE__ */ jsxs(
        "a",
        {
          href: "/",
          target: "_blank",
          rel: "noopener noreferrer",
          className: "inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition text-sm font-medium",
          children: [
            /* @__PURE__ */ jsx(Eye, { size: 16 }),
            " Voir le site"
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-3 gap-4", children: [
      /* @__PURE__ */ jsx("div", { className: "bg-white rounded-xl border border-gray-200 p-5", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsx("div", { className: "p-2.5 bg-amber-50 rounded-lg", children: /* @__PURE__ */ jsx(Calendar, { size: 20, className: "text-amber-600" }) }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("p", { className: "text-2xl font-bold text-gray-900", children: stats.reservations }),
          /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-500", children: "Reservations totales" })
        ] })
      ] }) }),
      /* @__PURE__ */ jsx("div", { className: "bg-white rounded-xl border border-gray-200 p-5", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsx("div", { className: "p-2.5 bg-green-50 rounded-lg", children: /* @__PURE__ */ jsx(Clock, { size: 20, className: "text-green-600" }) }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("p", { className: "text-2xl font-bold text-gray-900", children: stats.reservationsToday }),
          /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-500", children: "Aujourd'hui" })
        ] })
      ] }) }),
      /* @__PURE__ */ jsx("div", { className: "bg-white rounded-xl border border-gray-200 p-5", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsx("div", { className: "p-2.5 bg-blue-50 rounded-lg", children: /* @__PURE__ */ jsx(BookOpen, { size: 20, className: "text-blue-600" }) }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("p", { className: "text-2xl font-bold text-gray-900", children: stats.blogPosts }),
          /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-500", children: "Articles de blog" })
        ] })
      ] }) })
    ] }),
    /* @__PURE__ */ jsxs("div", { id: "reservations", className: "bg-white rounded-xl border border-gray-200", children: [
      /* @__PURE__ */ jsx("div", { className: "p-5 border-b border-gray-100", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-lg font-bold text-gray-900", children: "Reservations" }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ jsx("div", { className: "flex gap-2", children: ["all", "pending", "confirmed", "cancelled"].map((f) => /* @__PURE__ */ jsx(
            "button",
            {
              onClick: () => setFilter(f),
              className: `px-3 py-1.5 text-xs font-medium rounded-lg transition ${filter === f ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`,
              children: f === "all" ? "Toutes" : f === "pending" ? "En attente" : f === "confirmed" ? "Confirmees" : "Annulees"
            },
            f
          )) }),
          reservations.length > 0 && /* @__PURE__ */ jsxs(
            "button",
            {
              onClick: deleteAllReservations,
              className: "inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-red-600 text-white rounded-lg hover:bg-red-700 transition",
              children: [
                /* @__PURE__ */ jsx(Trash2, { size: 13 }),
                " Tout supprimer"
              ]
            }
          )
        ] })
      ] }) }),
      /* @__PURE__ */ jsx("div", { className: "divide-y divide-gray-100 max-h-[600px] overflow-y-auto", children: filteredReservations.length === 0 ? /* @__PURE__ */ jsx("div", { className: "p-8 text-center text-gray-500 text-sm", children: "Aucune reservation" }) : filteredReservations.map((r) => /* @__PURE__ */ jsx("div", { className: "p-4 hover:bg-gray-50 transition", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex-1 min-w-0 space-y-1.5", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 flex-wrap", children: [
            /* @__PURE__ */ jsxs("span", { className: "font-semibold text-gray-900", children: [
              r.prenom,
              " ",
              r.nom
            ] }),
            getStatusBadge(r.statut)
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-gray-500", children: [
            /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-1", children: [
              /* @__PURE__ */ jsx(Phone, { size: 11 }),
              r.telephone
            ] }),
            r.email && /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-1", children: [
              /* @__PURE__ */ jsx(Mail, { size: 11 }),
              r.email
            ] }),
            /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-1", children: [
              /* @__PURE__ */ jsx(Calendar, { size: 11 }),
              r.date_rdv,
              " a ",
              r.heure_rdv
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-1 text-xs text-gray-600", children: [
            /* @__PURE__ */ jsx(MapPin, { size: 11, className: "mt-0.5 flex-shrink-0 text-gray-400" }),
            /* @__PURE__ */ jsxs("span", { className: "truncate", children: [
              r.adresse_depart,
              " → ",
              r.adresse_arrivee
            ] })
          ] }),
          r.message && /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-400 italic truncate", children: r.message })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 flex-shrink-0", children: [
          r.statut !== "confirmed" && /* @__PURE__ */ jsx(
            "button",
            {
              onClick: () => updateStatus(r.id, "confirmed"),
              className: "px-3 py-1.5 text-xs font-medium bg-green-600 text-white rounded-lg hover:bg-green-700 transition",
              children: "Confirmer"
            }
          ),
          r.statut !== "cancelled" && /* @__PURE__ */ jsx(
            "button",
            {
              onClick: () => updateStatus(r.id, "cancelled"),
              className: "px-3 py-1.5 text-xs font-medium bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition",
              children: "Annuler"
            }
          )
        ] })
      ] }) }, r.id)) })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-xl border border-gray-200", children: [
      /* @__PURE__ */ jsxs("div", { className: "p-5 border-b border-gray-100 flex items-center justify-between", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-lg font-bold text-gray-900", children: "Articles recents" }),
        /* @__PURE__ */ jsx(
          "button",
          {
            onClick: () => navigate("/admin/blog"),
            className: "text-sm text-blue-600 hover:text-blue-700 font-medium",
            children: "Voir tout"
          }
        )
      ] }),
      /* @__PURE__ */ jsx("div", { className: "divide-y divide-gray-100", children: recentPosts.length === 0 ? /* @__PURE__ */ jsx("div", { className: "p-6 text-center text-gray-500 text-sm", children: "Aucun article" }) : recentPosts.map((post) => /* @__PURE__ */ jsxs(
        "div",
        {
          className: "p-4 flex items-center justify-between hover:bg-gray-50 transition cursor-pointer",
          onClick: () => navigate(`/admin/blog/edit/${post.id}`),
          children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("p", { className: "font-medium text-gray-800 text-sm", children: post.title }),
              /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-400 mt-0.5", children: new Date(post.updated_at).toLocaleDateString("fr-FR") })
            ] }),
            /* @__PURE__ */ jsx("span", { className: `px-2 py-1 text-xs rounded-full font-medium ${post.published ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-600"}`, children: post.published ? "Publie" : "Brouillon" })
          ]
        },
        post.id
      )) })
    ] })
  ] }) });
}
function PagesManager() {
  const [pages, setPages] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    fetchPages();
  }, []);
  const fetchPages = async () => {
    const { data } = await supabase.from("pages").select("*").order("updated_at", { ascending: false });
    if (data) setPages(data);
    setLoading(false);
  };
  const deletePage = async (id) => {
    if (!confirm("Supprimer cette page ?")) return;
    await supabase.from("pages").delete().eq("id", id);
    fetchPages();
  };
  const togglePublish = async (id, currentStatus) => {
    await supabase.from("pages").update({ published: !currentStatus }).eq("id", id);
    fetchPages();
  };
  return /* @__PURE__ */ jsx(AdminLayout, { children: /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center mb-8", children: [
      /* @__PURE__ */ jsx("h1", { className: "text-3xl font-bold text-gray-800", children: "Gestion des pages" }),
      /* @__PURE__ */ jsxs(
        "button",
        {
          onClick: () => navigate("/admin/pages/new"),
          className: "flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition",
          children: [
            /* @__PURE__ */ jsx(Plus, { size: 20 }),
            "Nouvelle page"
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsx("div", { className: "bg-white rounded-xl shadow-lg overflow-hidden", children: /* @__PURE__ */ jsxs("table", { className: "w-full", children: [
      /* @__PURE__ */ jsx("thead", { className: "bg-gray-50 border-b", children: /* @__PURE__ */ jsxs("tr", { children: [
        /* @__PURE__ */ jsx("th", { className: "px-6 py-4 text-left text-sm font-semibold text-gray-700", children: "Titre" }),
        /* @__PURE__ */ jsx("th", { className: "px-6 py-4 text-left text-sm font-semibold text-gray-700", children: "Slug" }),
        /* @__PURE__ */ jsx("th", { className: "px-6 py-4 text-left text-sm font-semibold text-gray-700", children: "Statut" }),
        /* @__PURE__ */ jsx("th", { className: "px-6 py-4 text-left text-sm font-semibold text-gray-700", children: "Modifié" }),
        /* @__PURE__ */ jsx("th", { className: "px-6 py-4 text-right text-sm font-semibold text-gray-700", children: "Actions" })
      ] }) }),
      /* @__PURE__ */ jsx("tbody", { children: loading ? /* @__PURE__ */ jsx("tr", { children: /* @__PURE__ */ jsx("td", { colSpan: 5, className: "px-6 py-8 text-center text-gray-500", children: "Chargement..." }) }) : pages.length === 0 ? /* @__PURE__ */ jsx("tr", { children: /* @__PURE__ */ jsx("td", { colSpan: 5, className: "px-6 py-8 text-center text-gray-500", children: "Aucune page" }) }) : pages.map((page) => /* @__PURE__ */ jsxs("tr", { className: "border-b hover:bg-gray-50", children: [
        /* @__PURE__ */ jsx("td", { className: "px-6 py-4 font-medium text-gray-800", children: page.title }),
        /* @__PURE__ */ jsx("td", { className: "px-6 py-4 text-gray-600 text-sm", children: page.slug }),
        /* @__PURE__ */ jsx("td", { className: "px-6 py-4", children: /* @__PURE__ */ jsx(
          "span",
          {
            className: `inline-block px-3 py-1 rounded-full text-xs font-medium ${page.published ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"}`,
            children: page.published ? "Publié" : "Brouillon"
          }
        ) }),
        /* @__PURE__ */ jsx("td", { className: "px-6 py-4 text-gray-600 text-sm", children: new Date(page.updated_at).toLocaleDateString("fr-FR") }),
        /* @__PURE__ */ jsx("td", { className: "px-6 py-4 text-right", children: /* @__PURE__ */ jsxs("div", { className: "flex gap-2 justify-end", children: [
          /* @__PURE__ */ jsx(
            "button",
            {
              onClick: () => togglePublish(page.id, page.published),
              className: "p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition",
              title: page.published ? "Dépublier" : "Publier",
              children: page.published ? /* @__PURE__ */ jsx(EyeOff, { size: 18 }) : /* @__PURE__ */ jsx(Eye, { size: 18 })
            }
          ),
          /* @__PURE__ */ jsx(
            "button",
            {
              onClick: () => navigate(`/admin/pages/${page.id}`),
              className: "p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition",
              children: /* @__PURE__ */ jsx(Edit, { size: 18 })
            }
          ),
          /* @__PURE__ */ jsx(
            "button",
            {
              onClick: () => deletePage(page.id),
              className: "p-2 text-red-600 hover:bg-red-50 rounded-lg transition",
              children: /* @__PURE__ */ jsx(Trash2, { size: 18 })
            }
          )
        ] }) })
      ] }, page.id)) })
    ] }) })
  ] }) });
}
function RichTextEditor({
  value,
  onChange,
  onImageClick,
  minHeight = "300px"
}) {
  const textareaRef = useRef(null);
  const [history, setHistory] = useState([value]);
  const [historyIndex, setHistoryIndex] = useState(0);
  const insertText = (before, after = "", placeholder = "") => {
    const textarea = textareaRef.current;
    if (!textarea) return;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = value.substring(start, end) || placeholder;
    const newText = value.substring(0, start) + before + selectedText + after + value.substring(end);
    onChange(newText);
    addToHistory(newText);
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(
        start + before.length,
        start + before.length + selectedText.length
      );
    }, 0);
  };
  const addToHistory = (newValue) => {
    const newHistory = history.slice(0, historyIndex + 1);
    newHistory.push(newValue);
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
  };
  const undo = () => {
    if (historyIndex > 0) {
      const newIndex = historyIndex - 1;
      setHistoryIndex(newIndex);
      onChange(history[newIndex]);
    }
  };
  const redo = () => {
    if (historyIndex < history.length - 1) {
      const newIndex = historyIndex + 1;
      setHistoryIndex(newIndex);
      onChange(history[newIndex]);
    }
  };
  const insertLink = () => {
    const url = prompt("Entrez l'URL :");
    if (url) {
      insertText('<a href="' + url + '" target="_blank" rel="noopener noreferrer">', "</a>", "Texte du lien");
    }
  };
  const tools = [
    { icon: Undo, action: undo, title: "Annuler (Ctrl+Z)", disabled: historyIndex === 0 },
    { icon: Redo, action: redo, title: "Refaire (Ctrl+Y)", disabled: historyIndex === history.length - 1 },
    { divider: true },
    { icon: Heading2, action: () => insertText("<h2>", "</h2>", "Titre 2"), title: "Titre H2" },
    { icon: Heading3, action: () => insertText("<h3>", "</h3>", "Titre 3"), title: "Titre H3" },
    { divider: true },
    { icon: Bold, action: () => insertText("<strong>", "</strong>", "Texte en gras"), title: "Gras (Ctrl+B)" },
    { icon: Italic, action: () => insertText("<em>", "</em>", "Texte en italique"), title: "Italique (Ctrl+I)" },
    { icon: Underline, action: () => insertText("<u>", "</u>", "Texte souligné"), title: "Souligné" },
    { divider: true },
    { icon: List, action: () => insertText("<ul>\n  <li>", "</li>\n</ul>\n", "Élément"), title: "Liste non ordonnée" },
    { icon: ListOrdered, action: () => insertText("<ol>\n  <li>", "</li>\n</ol>\n", "Élément"), title: "Liste ordonnée" },
    { icon: Quote, action: () => insertText("<blockquote>", "</blockquote>", "Citation"), title: "Citation" },
    { divider: true },
    { icon: AlignLeft, action: () => insertText('<p style="text-align: left;">', "</p>", "Texte aligné à gauche"), title: "Aligner à gauche" },
    { icon: AlignCenter, action: () => insertText('<p style="text-align: center;">', "</p>", "Texte centré"), title: "Centrer" },
    { icon: AlignRight, action: () => insertText('<p style="text-align: right;">', "</p>", "Texte aligné à droite"), title: "Aligner à droite" },
    { divider: true },
    { icon: Link$1, action: insertLink, title: "Insérer un lien" },
    { icon: Code, action: () => insertText("<code>", "</code>", "code"), title: "Code inline" }
  ];
  if (onImageClick) {
    tools.push({
      icon: Image$1,
      action: onImageClick,
      title: "Insérer une image depuis la médiathèque"
    });
  }
  const handleKeyDown = (e) => {
    if (e.ctrlKey || e.metaKey) {
      switch (e.key.toLowerCase()) {
        case "b":
          e.preventDefault();
          insertText("<strong>", "</strong>", "Texte en gras");
          break;
        case "i":
          e.preventDefault();
          insertText("<em>", "</em>", "Texte en italique");
          break;
        case "z":
          e.preventDefault();
          if (e.shiftKey) {
            redo();
          } else {
            undo();
          }
          break;
        case "y":
          e.preventDefault();
          redo();
          break;
      }
    }
  };
  return /* @__PURE__ */ jsxs("div", { className: "border rounded-lg overflow-hidden bg-white", children: [
    /* @__PURE__ */ jsx("div", { className: "bg-gray-50 border-b px-3 py-2 flex flex-wrap gap-1", children: tools.map((tool, index) => {
      if (tool.divider) {
        return /* @__PURE__ */ jsx("div", { className: "w-px bg-gray-300 mx-1" }, `divider-${index}`);
      }
      const Icon = tool.icon;
      return /* @__PURE__ */ jsx(
        "button",
        {
          type: "button",
          onClick: tool.action,
          disabled: tool.disabled,
          title: tool.title,
          className: "p-2 hover:bg-gray-200 rounded transition disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-gray-50",
          children: /* @__PURE__ */ jsx(Icon, { size: 18, className: "text-gray-700" })
        },
        index
      );
    }) }),
    /* @__PURE__ */ jsx(
      "textarea",
      {
        ref: textareaRef,
        value,
        onChange: (e) => {
          onChange(e.target.value);
          if (e.target.value !== history[historyIndex]) {
            addToHistory(e.target.value);
          }
        },
        onKeyDown: handleKeyDown,
        className: "w-full px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-sm",
        style: { minHeight, resize: "vertical" },
        placeholder: "Saisissez votre contenu ici..."
      }
    ),
    /* @__PURE__ */ jsx("div", { className: "bg-gray-50 border-t px-4 py-2 text-xs text-gray-600", children: "HTML supporté • Ctrl+B pour gras • Ctrl+I pour italique • Ctrl+Z pour annuler" })
  ] });
}
async function resizeImage(file, options = {}) {
  const {
    maxWidth = 1e3,
    maxHeight = 100,
    quality = 0.9,
    maintainAspectRatio = true
  } = options;
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      var _a2;
      const img = new Image();
      img.onload = () => {
        let width = img.width;
        let height = img.height;
        if (maintainAspectRatio) {
          if (height > maxHeight) {
            width = width * maxHeight / height;
            height = maxHeight;
          }
          if (width > maxWidth) {
            height = height * maxWidth / width;
            width = maxWidth;
          }
        } else {
          width = Math.min(width, maxWidth);
          height = Math.min(height, maxHeight);
        }
        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        if (!ctx) {
          reject(new Error("Could not get canvas context"));
          return;
        }
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = "high";
        ctx.drawImage(img, 0, 0, width, height);
        canvas.toBlob(
          (blob) => {
            if (!blob) {
              reject(new Error("Could not create blob"));
              return;
            }
            resolve({
              blob,
              width: Math.round(width),
              height: Math.round(height),
              originalSize: file.size,
              newSize: blob.size
            });
          },
          file.type === "image/png" ? "image/png" : "image/jpeg",
          quality
        );
      };
      img.onerror = () => {
        reject(new Error("Could not load image"));
      };
      img.src = (_a2 = e.target) == null ? void 0 : _a2.result;
    };
    reader.onerror = () => {
      reject(new Error("Could not read file"));
    };
    reader.readAsDataURL(file);
  });
}
function getImageInfo(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      var _a2;
      const img = new Image();
      img.onload = () => {
        resolve({
          width: img.width,
          height: img.height
        });
      };
      img.onerror = () => {
        reject(new Error("Could not load image"));
      };
      img.src = (_a2 = e.target) == null ? void 0 : _a2.result;
    };
    reader.onerror = () => {
      reject(new Error("Could not read file"));
    };
    reader.readAsDataURL(file);
  });
}
function MediaPicker({ onSelect, onClose, logoMode = false }) {
  const [media, setMedia] = useState([]);
  const [filteredMedia, setFilteredMedia] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedUrl, setSelectedUrl] = useState("");
  const [newMediaUrl, setNewMediaUrl] = useState("");
  const [showUpload, setShowUpload] = useState(false);
  const [uploadMode, setUploadMode] = useState("file");
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [imageInfo, setImageInfo] = useState(null);
  useEffect(() => {
    fetchMedia();
  }, []);
  useEffect(() => {
    if (searchTerm) {
      setFilteredMedia(
        media.filter(
          (item) => item.filename.toLowerCase().includes(searchTerm.toLowerCase()) || item.url.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    } else {
      setFilteredMedia(media);
    }
  }, [searchTerm, media]);
  const fetchMedia = async () => {
    const { data } = await supabase.from("media").select("*").order("created_at", { ascending: false });
    if (data) {
      setMedia(data);
      setFilteredMedia(data);
    }
    setLoading(false);
  };
  const handleFileSelect = async (e) => {
    var _a2;
    const file = (_a2 = e.target.files) == null ? void 0 : _a2[0];
    if (file) {
      setSelectedFile(file);
      if (logoMode && file.type.startsWith("image/")) {
        try {
          const info = await getImageInfo(file);
          setImageInfo(info);
        } catch (error) {
          console.error("Error getting image info:", error);
          setImageInfo(null);
        }
      }
    }
  };
  const uploadFile = async (e) => {
    e.preventDefault();
    if (!selectedFile) return;
    setUploading(true);
    try {
      let fileToUpload = selectedFile;
      let finalSize = selectedFile.size;
      if (logoMode && selectedFile.type.startsWith("image/")) {
        const resized = await resizeImage(selectedFile, {
          maxHeight: 100,
          maxWidth: 500,
          quality: 0.9,
          maintainAspectRatio: true
        });
        console.log(`Image redimensionnée: ${resized.width}x${resized.height}px`);
        console.log(`Taille originale: ${(resized.originalSize / 1024).toFixed(2)}KB → Nouvelle taille: ${(resized.newSize / 1024).toFixed(2)}KB`);
        const ext = selectedFile.type === "image/png" ? "png" : "jpg";
        fileToUpload = new File([resized.blob], `${selectedFile.name.split(".")[0]}.${ext}`, {
          type: resized.blob.type
        });
        finalSize = resized.blob.size;
      }
      const fileExt = fileToUpload.name.split(".").pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
      const filePath = `${fileName}`;
      console.log("Début upload du fichier:", fileName, "Taille:", finalSize);
      const { error: uploadError, data: uploadData } = await supabase.storage.from("media").upload(filePath, fileToUpload, {
        cacheControl: "3600",
        upsert: false
      });
      if (uploadError) {
        console.error("Erreur upload Storage:", uploadError);
        throw new Error(`Erreur upload: ${uploadError.message}`);
      }
      console.log("Upload réussi:", uploadData);
      const { data: { publicUrl } } = supabase.storage.from("media").getPublicUrl(filePath);
      console.log("Public URL:", publicUrl);
      const { data: insertData, error: insertError } = await supabase.from("media").insert([{
        filename: selectedFile.name,
        url: publicUrl,
        mime_type: fileToUpload.type,
        size: finalSize
      }]).select();
      if (insertError) {
        console.error("Erreur insertion media:", insertError);
        throw insertError;
      }
      console.log("Media inséré:", insertData);
      setSelectedFile(null);
      setImageInfo(null);
      setShowUpload(false);
      setSelectedUrl(publicUrl);
      await fetchMedia();
      alert(logoMode ? `Image optimisée et uploadée avec succès!

URL: ${publicUrl}

Cliquez sur l'image dans la galerie puis sur "Insérer le média".` : `Fichier uploadé avec succès!

URL: ${publicUrl}

Cliquez sur l'image dans la galerie puis sur "Insérer le média".`);
    } catch (error) {
      console.error("Error uploading file:", error);
      const errorMessage = error instanceof Error ? error.message : "Erreur inconnue";
      alert(`Erreur lors de l'upload du fichier:

${errorMessage}

Vérifiez la console (F12) pour plus de détails.`);
    } finally {
      setUploading(false);
    }
  };
  const handleUploadUrl = async (e) => {
    e.preventDefault();
    if (!newMediaUrl.trim()) return;
    try {
      const filename = newMediaUrl.split("/").pop() || "image";
      await supabase.from("media").insert([{
        filename,
        url: newMediaUrl,
        mime_type: "image",
        size: 0
      }]);
      setSelectedUrl(newMediaUrl);
      setNewMediaUrl("");
      setShowUpload(false);
      await fetchMedia();
      alert(`Média ajouté avec succès! Cliquez sur "Insérer le média" pour l'ajouter.`);
    } catch (error) {
      console.error("Error adding media:", error);
      alert("Erreur lors de l'ajout du média");
    }
  };
  const handleSelect = () => {
    if (selectedUrl) {
      onSelect(selectedUrl);
      onClose();
    }
  };
  return /* @__PURE__ */ jsx("div", { className: "fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4", children: /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-2xl shadow-2xl w-full max-w-5xl max-h-[90vh] flex flex-col", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center p-6 border-b", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsxs("h2", { className: "text-2xl font-bold text-gray-800 flex items-center gap-2", children: [
          /* @__PURE__ */ jsx(Image$1, { size: 28 }),
          "Sélectionner un média"
        ] }),
        /* @__PURE__ */ jsxs("p", { className: "text-sm text-gray-600 mt-1", children: [
          filteredMedia.length,
          " fichier",
          filteredMedia.length > 1 ? "s" : "",
          " disponible",
          filteredMedia.length > 1 ? "s" : ""
        ] })
      ] }),
      /* @__PURE__ */ jsx(
        "button",
        {
          onClick: onClose,
          className: "p-2 hover:bg-gray-100 rounded-lg transition",
          children: /* @__PURE__ */ jsx(X, { size: 24 })
        }
      )
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "p-6 border-b bg-gray-50", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex gap-3", children: [
        /* @__PURE__ */ jsxs("div", { className: "relative flex-1", children: [
          /* @__PURE__ */ jsx(Search, { className: "absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400", size: 18 }),
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "text",
              value: searchTerm,
              onChange: (e) => setSearchTerm(e.target.value),
              placeholder: "Rechercher un média...",
              className: "w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            }
          )
        ] }),
        /* @__PURE__ */ jsxs(
          "button",
          {
            onClick: () => setShowUpload(!showUpload),
            className: "flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition whitespace-nowrap",
            children: [
              /* @__PURE__ */ jsx(Upload, { size: 18 }),
              "Ajouter"
            ]
          }
        )
      ] }),
      showUpload && /* @__PURE__ */ jsxs("div", { className: "mt-4 p-4 bg-white border rounded-lg space-y-4", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex gap-2", children: [
          /* @__PURE__ */ jsx(
            "button",
            {
              onClick: () => setUploadMode("file"),
              className: `flex-1 py-2 px-4 rounded-lg font-medium transition ${uploadMode === "file" ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`,
              children: "📁 Upload fichier"
            }
          ),
          /* @__PURE__ */ jsx(
            "button",
            {
              onClick: () => setUploadMode("url"),
              className: `flex-1 py-2 px-4 rounded-lg font-medium transition ${uploadMode === "url" ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`,
              children: "🔗 URL externe"
            }
          )
        ] }),
        uploadMode === "file" ? /* @__PURE__ */ jsxs("form", { onSubmit: uploadFile, children: [
          /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700 mb-2", children: "Sélectionner un fichier" }),
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "file",
              onChange: handleFileSelect,
              accept: "image/*,video/*,application/pdf",
              className: "w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 text-sm file:mr-3 file:py-1.5 file:px-3 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 mb-3",
              required: true
            }
          ),
          selectedFile && /* @__PURE__ */ jsxs("div", { className: "mb-3 space-y-2", children: [
            /* @__PURE__ */ jsxs("div", { className: "p-2 bg-green-50 border border-green-200 rounded text-sm text-gray-700", children: [
              /* @__PURE__ */ jsx("strong", { children: "Fichier:" }),
              " ",
              selectedFile.name,
              " (",
              (selectedFile.size / 1024).toFixed(2),
              " KB)"
            ] }),
            logoMode && imageInfo && /* @__PURE__ */ jsx("div", { className: `p-2 border rounded text-sm ${imageInfo.height <= 100 ? "bg-green-50 border-green-200 text-green-800" : "bg-yellow-50 border-yellow-200 text-yellow-800"}`, children: /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-2", children: [
              imageInfo.height <= 100 ? /* @__PURE__ */ jsx(Check, { size: 16, className: "mt-0.5 flex-shrink-0" }) : /* @__PURE__ */ jsx(AlertCircle, { size: 16, className: "mt-0.5 flex-shrink-0" }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsxs("p", { children: [
                  /* @__PURE__ */ jsx("strong", { children: "Dimensions:" }),
                  " ",
                  imageInfo.width,
                  "x",
                  imageInfo.height,
                  "px"
                ] }),
                imageInfo.height > 100 && /* @__PURE__ */ jsx("p", { className: "text-xs mt-1", children: "⚠️ L'image sera automatiquement redimensionnée à 100px de hauteur lors de l'upload" })
              ] })
            ] }) })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex gap-2", children: [
            /* @__PURE__ */ jsx(
              "button",
              {
                type: "submit",
                disabled: !selectedFile || uploading,
                className: "flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition disabled:bg-gray-400 disabled:cursor-not-allowed",
                children: uploading ? "Upload..." : "Uploader"
              }
            ),
            /* @__PURE__ */ jsx(
              "button",
              {
                type: "button",
                onClick: () => {
                  setShowUpload(false);
                  setSelectedFile(null);
                },
                className: "px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition",
                children: "Annuler"
              }
            )
          ] })
        ] }) : /* @__PURE__ */ jsxs("form", { onSubmit: handleUploadUrl, children: [
          /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700 mb-2", children: "URL du média" }),
          /* @__PURE__ */ jsxs("div", { className: "flex gap-2", children: [
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "url",
                value: newMediaUrl,
                onChange: (e) => setNewMediaUrl(e.target.value),
                placeholder: "https://example.com/image.jpg",
                className: "flex-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500",
                required: true
              }
            ),
            /* @__PURE__ */ jsx(
              "button",
              {
                type: "submit",
                className: "px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition",
                children: "Ajouter"
              }
            )
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "flex-1 overflow-y-auto p-6", children: loading ? /* @__PURE__ */ jsx("div", { className: "text-center py-12 text-gray-500", children: "Chargement..." }) : filteredMedia.length === 0 ? /* @__PURE__ */ jsxs("div", { className: "text-center py-12 text-gray-500", children: [
      /* @__PURE__ */ jsx(Image$1, { className: "mx-auto mb-4 text-gray-400", size: 48 }),
      /* @__PURE__ */ jsx("p", { children: searchTerm ? "Aucun résultat pour votre recherche." : "Aucun média disponible." })
    ] }) : /* @__PURE__ */ jsx("div", { className: "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4", children: filteredMedia.map((item) => /* @__PURE__ */ jsxs(
      "div",
      {
        onClick: () => setSelectedUrl(item.url),
        className: `relative border-2 rounded-lg overflow-hidden cursor-pointer transition-all ${selectedUrl === item.url ? "border-blue-600 shadow-lg scale-105" : "border-gray-200 hover:border-blue-400 hover:shadow-md"}`,
        children: [
          /* @__PURE__ */ jsxs("div", { className: "aspect-square bg-gray-100 relative", children: [
            /* @__PURE__ */ jsx(
              "img",
              {
                src: item.url,
                alt: item.filename,
                className: "w-full h-full object-cover",
                onError: (e) => {
                  e.currentTarget.src = "https://via.placeholder.com/200x200?text=Error";
                }
              }
            ),
            selectedUrl === item.url && /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-blue-600 bg-opacity-30 flex items-center justify-center", children: /* @__PURE__ */ jsx("div", { className: "bg-white rounded-full p-2", children: /* @__PURE__ */ jsx(Check, { className: "text-blue-600", size: 24 }) }) })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "p-2 bg-white", children: /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-600 truncate", children: item.filename }) })
        ]
      },
      item.id
    )) }) }),
    /* @__PURE__ */ jsxs("div", { className: "p-6 border-t bg-gray-50 flex justify-between items-center", children: [
      /* @__PURE__ */ jsx("div", { children: selectedUrl && /* @__PURE__ */ jsxs("p", { className: "text-sm text-gray-600", children: [
        /* @__PURE__ */ jsx("span", { className: "font-medium", children: "Sélectionné:" }),
        " ",
        selectedUrl.substring(0, 50),
        "..."
      ] }) }),
      /* @__PURE__ */ jsxs("div", { className: "flex gap-3", children: [
        /* @__PURE__ */ jsx(
          "button",
          {
            onClick: onClose,
            className: "px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition",
            children: "Annuler"
          }
        ),
        /* @__PURE__ */ jsx(
          "button",
          {
            onClick: handleSelect,
            disabled: !selectedUrl,
            className: "px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition disabled:bg-gray-400 disabled:cursor-not-allowed",
            children: "Insérer le média"
          }
        )
      ] })
    ] })
  ] }) });
}
function Toast({ message, type, onClose, duration = 3e3 }) {
  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(onClose, duration);
      return () => clearTimeout(timer);
    }
  }, [duration, onClose]);
  const icons = {
    success: /* @__PURE__ */ jsx(CheckCircle, { size: 20 }),
    error: /* @__PURE__ */ jsx(XCircle, { size: 20 }),
    warning: /* @__PURE__ */ jsx(AlertCircle, { size: 20 }),
    info: /* @__PURE__ */ jsx(Info, { size: 20 })
  };
  const styles = {
    success: "bg-green-50 border-green-500 text-green-800",
    error: "bg-red-50 border-red-500 text-red-800",
    warning: "bg-yellow-50 border-yellow-500 text-yellow-800",
    info: "bg-blue-50 border-blue-500 text-blue-800"
  };
  return /* @__PURE__ */ jsxs("div", { className: `fixed bottom-6 right-6 z-50 flex items-center gap-3 px-4 py-3 rounded-lg border-l-4 shadow-xl ${styles[type]} animate-slide-up`, children: [
    /* @__PURE__ */ jsx("div", { className: "flex-shrink-0", children: icons[type] }),
    /* @__PURE__ */ jsx("p", { className: "font-medium", children: message }),
    /* @__PURE__ */ jsx(
      "button",
      {
        onClick: onClose,
        className: "ml-4 p-1 hover:bg-white/50 rounded transition",
        children: /* @__PURE__ */ jsx(X, { size: 16 })
      }
    )
  ] });
}
function useToast() {
  const [toasts, setToasts] = useState([]);
  const showToast = useCallback((message, type = "info") => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);
  }, []);
  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);
  const ToastContainer = useCallback(() => {
    if (toasts.length === 0) return null;
    return createPortal(
      /* @__PURE__ */ jsx("div", { className: "fixed bottom-6 right-6 z-50 space-y-3", children: toasts.map((toast, index) => /* @__PURE__ */ jsx(
        "div",
        {
          style: {
            transform: `translateY(-${index * 80}px)`,
            transition: "transform 0.3s ease"
          },
          children: /* @__PURE__ */ jsx(
            Toast,
            {
              message: toast.message,
              type: toast.type,
              onClose: () => removeToast(toast.id)
            }
          )
        },
        toast.id
      )) }),
      document.body
    );
  }, [toasts, removeToast]);
  return {
    showToast,
    success: (message) => showToast(message, "success"),
    error: (message) => showToast(message, "error"),
    warning: (message) => showToast(message, "warning"),
    info: (message) => showToast(message, "info"),
    ToastContainer
  };
}
function PageEditorEnhanced() {
  const { id } = useParams();
  const navigate = useNavigate();
  const toast = useToast();
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("basic");
  const [showMediaPicker, setShowMediaPicker] = useState(false);
  const [mediaPickerTarget, setMediaPickerTarget] = useState("content");
  const [targetSectionId, setTargetSectionId] = useState("");
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    meta_title: "",
    meta_description: "",
    meta_keywords: "",
    hero_title: "",
    hero_subtitle: "",
    hero_image_url: "",
    hero_button_text: "Réserver maintenant",
    hero_button_link: "/reservation-taxi-vsl",
    content: "",
    sections: [],
    published: false
  });
  useEffect(() => {
    if (id && id !== "new") {
      fetchPage();
    }
  }, [id]);
  const fetchPage = async () => {
    const { data, error } = await supabase.from("pages").select("*").eq("id", id).maybeSingle();
    if (error) {
      toast.error("Erreur lors du chargement de la page");
      return;
    }
    if (data) {
      setFormData({
        ...data,
        sections: data.sections || []
      });
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (id === "new") {
        const { error } = await supabase.from("pages").insert([formData]);
        if (error) throw error;
        toast.success("Page créée avec succès");
      } else {
        const { error } = await supabase.from("pages").update(formData).eq("id", id);
        if (error) throw error;
        toast.success("Page mise à jour avec succès");
      }
      navigate("/admin/pages");
    } catch (error) {
      console.error("Error saving page:", error);
      toast.error("Erreur lors de l'enregistrement");
    } finally {
      setLoading(false);
    }
  };
  const addSection = () => {
    const newSection = {
      id: Date.now().toString(),
      type: "text",
      title: "",
      subtitle: "",
      content: "",
      items: []
    };
    setFormData({ ...formData, sections: [...formData.sections, newSection] });
    toast.info("Nouvelle section ajoutée");
  };
  const updateSection = (sectionId, updates) => {
    setFormData({
      ...formData,
      sections: formData.sections.map((s) => s.id === sectionId ? { ...s, ...updates } : s)
    });
  };
  const deleteSection = (sectionId) => {
    setFormData({
      ...formData,
      sections: formData.sections.filter((s) => s.id !== sectionId)
    });
    toast.success("Section supprimée");
  };
  const moveSectionUp = (index) => {
    if (index === 0) return;
    const newSections = [...formData.sections];
    [newSections[index - 1], newSections[index]] = [newSections[index], newSections[index - 1]];
    setFormData({ ...formData, sections: newSections });
  };
  const moveSectionDown = (index) => {
    if (index === formData.sections.length - 1) return;
    const newSections = [...formData.sections];
    [newSections[index], newSections[index + 1]] = [newSections[index + 1], newSections[index]];
    setFormData({ ...formData, sections: newSections });
  };
  const tabs = [
    { id: "basic", label: "Informations de base" },
    { id: "hero", label: "Section Hero" },
    { id: "sections", label: "Sections de contenu" },
    { id: "seo", label: "SEO & Métadonnées" }
  ];
  return /* @__PURE__ */ jsxs(AdminLayout, { children: [
    /* @__PURE__ */ jsx(toast.ToastContainer, {}),
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsxs(
        "button",
        {
          onClick: () => navigate("/admin/pages"),
          className: "flex items-center gap-2 text-gray-600 hover:text-gray-800 mb-6",
          children: [
            /* @__PURE__ */ jsx(ArrowLeft, { size: 20 }),
            "Retour aux pages"
          ]
        }
      ),
      /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center mb-8", children: [
        /* @__PURE__ */ jsx("h1", { className: "text-3xl font-bold text-gray-800", children: id === "new" ? "Nouvelle page" : "Modifier la page" }),
        id !== "new" && formData.slug && /* @__PURE__ */ jsxs(
          "a",
          {
            href: `/${formData.slug}`,
            target: "_blank",
            rel: "noopener noreferrer",
            className: "flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition",
            children: [
              /* @__PURE__ */ jsx(Eye, { size: 18 }),
              "Voir la page"
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsx("div", { className: "mb-6", children: /* @__PURE__ */ jsx("div", { className: "border-b border-gray-200", children: /* @__PURE__ */ jsx("div", { className: "flex gap-4", children: tabs.map((tab) => /* @__PURE__ */ jsx(
        "button",
        {
          onClick: () => setActiveTab(tab.id),
          className: `px-4 py-3 font-medium transition ${activeTab === tab.id ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-600 hover:text-gray-800"}`,
          children: tab.label
        },
        tab.id
      )) }) }) }),
      /* @__PURE__ */ jsxs("form", { onSubmit: handleSubmit, className: "space-y-6", children: [
        activeTab === "basic" && /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-xl shadow-lg p-8", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-lg font-semibold text-gray-800 mb-6", children: "Informations de base" }),
          /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-6 mb-6", children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700 mb-2", children: "Titre de la page *" }),
              /* @__PURE__ */ jsx(
                "input",
                {
                  type: "text",
                  value: formData.title,
                  onChange: (e) => setFormData({ ...formData, title: e.target.value }),
                  required: true,
                  className: "w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500",
                  placeholder: "Ex: Transport VSL Paris"
                }
              )
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700 mb-2", children: "Slug (URL) *" }),
              /* @__PURE__ */ jsx(
                "input",
                {
                  type: "text",
                  value: formData.slug,
                  onChange: (e) => setFormData({ ...formData, slug: e.target.value }),
                  required: true,
                  className: "w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500",
                  placeholder: "Ex: vsl-paris"
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "mb-6", children: [
            /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700 mb-2", children: "Contenu principal (HTML)" }),
            /* @__PURE__ */ jsx(
              RichTextEditor,
              {
                value: formData.content,
                onChange: (value) => setFormData({ ...formData, content: value }),
                onImageClick: () => {
                  setMediaPickerTarget("content");
                  setShowMediaPicker(true);
                }
              }
            )
          ] }),
          /* @__PURE__ */ jsx("div", { className: "mb-6", children: /* @__PURE__ */ jsxs("label", { className: "flex items-center gap-2 cursor-pointer p-4 bg-blue-50 rounded-lg border border-blue-200", children: [
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "checkbox",
                checked: formData.published,
                onChange: (e) => setFormData({ ...formData, published: e.target.checked }),
                className: "w-5 h-5"
              }
            ),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("span", { className: "text-sm font-medium text-gray-700", children: "Publier cette page" }),
              /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-500", children: "La page sera visible sur le site" })
            ] })
          ] }) })
        ] }),
        activeTab === "hero" && /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-xl shadow-lg p-8", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-lg font-semibold text-gray-800 mb-6", children: "Section Hero (Bannière principale)" }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700 mb-2", children: "Titre Hero" }),
              /* @__PURE__ */ jsx(
                "input",
                {
                  type: "text",
                  value: formData.hero_title,
                  onChange: (e) => setFormData({ ...formData, hero_title: e.target.value }),
                  className: "w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500",
                  placeholder: "Grand titre affiché en haut de la page"
                }
              )
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700 mb-2", children: "Sous-titre Hero" }),
              /* @__PURE__ */ jsx(
                "textarea",
                {
                  value: formData.hero_subtitle,
                  onChange: (e) => setFormData({ ...formData, hero_subtitle: e.target.value }),
                  rows: 2,
                  className: "w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500",
                  placeholder: "Sous-titre descriptif"
                }
              )
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700 mb-2", children: "Image Hero" }),
              /* @__PURE__ */ jsx(
                "input",
                {
                  type: "url",
                  value: formData.hero_image_url,
                  onChange: (e) => setFormData({ ...formData, hero_image_url: e.target.value }),
                  placeholder: "https://example.com/image.jpg",
                  className: "w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 mb-2"
                }
              ),
              /* @__PURE__ */ jsx(
                "button",
                {
                  type: "button",
                  onClick: () => {
                    setMediaPickerTarget("hero");
                    setShowMediaPicker(true);
                  },
                  className: "px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition text-sm",
                  children: "Choisir depuis la médiathèque"
                }
              ),
              formData.hero_image_url && /* @__PURE__ */ jsx("div", { className: "mt-3", children: /* @__PURE__ */ jsx(
                "img",
                {
                  src: formData.hero_image_url,
                  alt: "Aperçu Hero",
                  className: "h-48 w-full object-cover rounded-lg border",
                  onError: (e) => {
                    e.currentTarget.style.display = "none";
                  }
                }
              ) })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-6", children: [
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700 mb-2", children: "Texte du bouton CTA" }),
                /* @__PURE__ */ jsx(
                  "input",
                  {
                    type: "text",
                    value: formData.hero_button_text,
                    onChange: (e) => setFormData({ ...formData, hero_button_text: e.target.value }),
                    className: "w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500",
                    placeholder: "Réserver maintenant"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700 mb-2", children: "Lien du bouton CTA" }),
                /* @__PURE__ */ jsx(
                  "input",
                  {
                    type: "text",
                    value: formData.hero_button_link,
                    onChange: (e) => setFormData({ ...formData, hero_button_link: e.target.value }),
                    className: "w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500",
                    placeholder: "/reservation-taxi-vsl"
                  }
                )
              ] })
            ] })
          ] })
        ] }),
        activeTab === "sections" && /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-xl shadow-lg p-8", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center mb-6", children: [
            /* @__PURE__ */ jsx("h2", { className: "text-lg font-semibold text-gray-800", children: "Sections de contenu" }),
            /* @__PURE__ */ jsxs(
              "button",
              {
                type: "button",
                onClick: addSection,
                className: "flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition",
                children: [
                  /* @__PURE__ */ jsx(Plus, { size: 18 }),
                  "Ajouter une section"
                ]
              }
            )
          ] }),
          formData.sections.length === 0 ? /* @__PURE__ */ jsx("p", { className: "text-gray-500 text-center py-8", children: 'Aucune section. Cliquez sur "Ajouter une section" pour commencer.' }) : /* @__PURE__ */ jsx("div", { className: "space-y-6", children: formData.sections.map((section, index) => /* @__PURE__ */ jsxs("div", { className: "border rounded-lg p-6 bg-gray-50", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-start mb-4", children: [
              /* @__PURE__ */ jsxs("div", { className: "flex gap-2", children: [
                /* @__PURE__ */ jsx(
                  "button",
                  {
                    type: "button",
                    onClick: () => moveSectionUp(index),
                    disabled: index === 0,
                    className: "p-2 text-gray-600 hover:bg-gray-200 rounded-lg disabled:opacity-30",
                    children: /* @__PURE__ */ jsx(MoveUp, { size: 18 })
                  }
                ),
                /* @__PURE__ */ jsx(
                  "button",
                  {
                    type: "button",
                    onClick: () => moveSectionDown(index),
                    disabled: index === formData.sections.length - 1,
                    className: "p-2 text-gray-600 hover:bg-gray-200 rounded-lg disabled:opacity-30",
                    children: /* @__PURE__ */ jsx(MoveDown, { size: 18 })
                  }
                )
              ] }),
              /* @__PURE__ */ jsx(
                "button",
                {
                  type: "button",
                  onClick: () => deleteSection(section.id),
                  className: "p-2 text-red-600 hover:bg-red-50 rounded-lg",
                  children: /* @__PURE__ */ jsx(Trash2, { size: 18 })
                }
              )
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700 mb-2", children: "Type de section" }),
                /* @__PURE__ */ jsxs(
                  "select",
                  {
                    value: section.type,
                    onChange: (e) => updateSection(section.id, { type: e.target.value }),
                    className: "w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500",
                    children: [
                      /* @__PURE__ */ jsx("option", { value: "text", children: "Texte simple" }),
                      /* @__PURE__ */ jsx("option", { value: "services", children: "Liste de services" }),
                      /* @__PURE__ */ jsx("option", { value: "features", children: "Caractéristiques" }),
                      /* @__PURE__ */ jsx("option", { value: "cta", children: "Appel à l'action" }),
                      /* @__PURE__ */ jsx("option", { value: "html", children: "HTML personnalisé" })
                    ]
                  }
                )
              ] }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700 mb-2", children: "Titre de la section" }),
                /* @__PURE__ */ jsx(
                  "input",
                  {
                    type: "text",
                    value: section.title,
                    onChange: (e) => updateSection(section.id, { title: e.target.value }),
                    className: "w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500",
                    placeholder: "Titre de la section"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700 mb-2", children: "Sous-titre (optionnel)" }),
                /* @__PURE__ */ jsx(
                  "input",
                  {
                    type: "text",
                    value: section.subtitle || "",
                    onChange: (e) => updateSection(section.id, { subtitle: e.target.value }),
                    className: "w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500",
                    placeholder: "Sous-titre"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700 mb-2", children: "Contenu" }),
                /* @__PURE__ */ jsx(
                  RichTextEditor,
                  {
                    value: section.content,
                    onChange: (value) => updateSection(section.id, { content: value }),
                    onImageClick: () => {
                      setTargetSectionId(section.id);
                      setMediaPickerTarget("section");
                      setShowMediaPicker(true);
                    },
                    minHeight: "200px"
                  }
                )
              ] })
            ] })
          ] }, section.id)) })
        ] }),
        activeTab === "seo" && /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-xl shadow-lg p-8", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-lg font-semibold text-gray-800 mb-6", children: "SEO & Métadonnées" }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700 mb-2", children: "Titre SEO (Meta Title)" }),
              /* @__PURE__ */ jsx(
                "input",
                {
                  type: "text",
                  value: formData.meta_title,
                  onChange: (e) => setFormData({ ...formData, meta_title: e.target.value }),
                  className: "w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500",
                  placeholder: "Titre optimisé pour les moteurs de recherche"
                }
              ),
              /* @__PURE__ */ jsxs("p", { className: "text-xs text-gray-500 mt-1", children: [
                "Recommandé: 50-60 caractères (",
                formData.meta_title.length,
                "/60)"
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700 mb-2", children: "Meta Description" }),
              /* @__PURE__ */ jsx(
                "textarea",
                {
                  value: formData.meta_description,
                  onChange: (e) => setFormData({ ...formData, meta_description: e.target.value }),
                  rows: 3,
                  className: "w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500",
                  placeholder: "Description affichée dans les résultats de recherche"
                }
              ),
              /* @__PURE__ */ jsxs("p", { className: "text-xs text-gray-500 mt-1", children: [
                "Recommandé: 150-160 caractères (",
                formData.meta_description.length,
                "/160)"
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700 mb-2", children: "Meta Keywords (séparés par des virgules)" }),
              /* @__PURE__ */ jsx(
                "input",
                {
                  type: "text",
                  value: formData.meta_keywords,
                  onChange: (e) => setFormData({ ...formData, meta_keywords: e.target.value }),
                  className: "w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500",
                  placeholder: "vsl, taxi, paris, transport"
                }
              )
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "bg-white rounded-xl shadow-lg p-8", children: /* @__PURE__ */ jsxs(
          "button",
          {
            type: "submit",
            disabled: loading,
            className: "w-full flex items-center justify-center gap-2 px-6 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition disabled:bg-gray-400 font-semibold text-lg",
            children: [
              /* @__PURE__ */ jsx(Save, { size: 20 }),
              loading ? "Enregistrement..." : "Enregistrer la page"
            ]
          }
        ) })
      ] })
    ] }),
    showMediaPicker && /* @__PURE__ */ jsx(
      MediaPicker,
      {
        onSelect: (url) => {
          if (mediaPickerTarget === "hero") {
            setFormData({ ...formData, hero_image_url: url });
          } else if (mediaPickerTarget === "section") {
            const section = formData.sections.find((s) => s.id === targetSectionId);
            if (section) {
              updateSection(targetSectionId, {
                content: section.content + `
<img src="${url}" alt="Image" class="w-full rounded-lg my-4" />
`
              });
            }
          } else {
            setFormData({ ...formData, content: formData.content + `
<img src="${url}" alt="Image" class="w-full rounded-lg my-4" />
` });
          }
          setShowMediaPicker(false);
        },
        onClose: () => setShowMediaPicker(false)
      }
    )
  ] });
}
function BlogManager() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    fetchPosts();
  }, []);
  const fetchPosts = async () => {
    const { data } = await supabase.from("blog_posts").select("*").order("updated_at", { ascending: false });
    if (data) setPosts(data);
    setLoading(false);
  };
  const deletePost = async (id) => {
    if (!confirm("Supprimer cet article ?")) return;
    await supabase.from("blog_posts").delete().eq("id", id);
    fetchPosts();
  };
  const togglePublish = async (id, currentStatus) => {
    const updates = { published: !currentStatus };
    if (!currentStatus) {
      updates.published_at = (/* @__PURE__ */ new Date()).toISOString();
    }
    await supabase.from("blog_posts").update(updates).eq("id", id);
    fetchPosts();
  };
  return /* @__PURE__ */ jsx(AdminLayout, { children: /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center mb-8", children: [
      /* @__PURE__ */ jsx("h1", { className: "text-3xl font-bold text-gray-800", children: "Gestion du blog" }),
      /* @__PURE__ */ jsxs(
        "button",
        {
          onClick: () => navigate("/admin/blog/new"),
          className: "flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition",
          children: [
            /* @__PURE__ */ jsx(Plus, { size: 20 }),
            "Nouvel article"
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsx("div", { className: "bg-white rounded-xl shadow-lg overflow-hidden", children: /* @__PURE__ */ jsxs("table", { className: "w-full", children: [
      /* @__PURE__ */ jsx("thead", { className: "bg-gray-50 border-b", children: /* @__PURE__ */ jsxs("tr", { children: [
        /* @__PURE__ */ jsx("th", { className: "px-6 py-4 text-left text-sm font-semibold text-gray-700", children: "Titre" }),
        /* @__PURE__ */ jsx("th", { className: "px-6 py-4 text-left text-sm font-semibold text-gray-700", children: "Statut" }),
        /* @__PURE__ */ jsx("th", { className: "px-6 py-4 text-left text-sm font-semibold text-gray-700", children: "Modifié" }),
        /* @__PURE__ */ jsx("th", { className: "px-6 py-4 text-right text-sm font-semibold text-gray-700", children: "Actions" })
      ] }) }),
      /* @__PURE__ */ jsx("tbody", { children: loading ? /* @__PURE__ */ jsx("tr", { children: /* @__PURE__ */ jsx("td", { colSpan: 4, className: "px-6 py-8 text-center text-gray-500", children: "Chargement..." }) }) : posts.length === 0 ? /* @__PURE__ */ jsx("tr", { children: /* @__PURE__ */ jsx("td", { colSpan: 4, className: "px-6 py-8 text-center text-gray-500", children: "Aucun article" }) }) : posts.map((post) => /* @__PURE__ */ jsxs("tr", { className: "border-b hover:bg-gray-50", children: [
        /* @__PURE__ */ jsx("td", { className: "px-6 py-4", children: /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("p", { className: "font-medium text-gray-800", children: post.title }),
          /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-500 mt-1", children: post.excerpt })
        ] }) }),
        /* @__PURE__ */ jsx("td", { className: "px-6 py-4", children: /* @__PURE__ */ jsx(
          "span",
          {
            className: `inline-block px-3 py-1 rounded-full text-xs font-medium ${post.published ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"}`,
            children: post.published ? "Publié" : "Brouillon"
          }
        ) }),
        /* @__PURE__ */ jsx("td", { className: "px-6 py-4 text-gray-600 text-sm", children: new Date(post.updated_at).toLocaleDateString("fr-FR") }),
        /* @__PURE__ */ jsx("td", { className: "px-6 py-4 text-right", children: /* @__PURE__ */ jsxs("div", { className: "flex gap-2 justify-end", children: [
          /* @__PURE__ */ jsx(
            "button",
            {
              onClick: () => togglePublish(post.id, post.published),
              className: "p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition",
              children: post.published ? /* @__PURE__ */ jsx(EyeOff, { size: 18 }) : /* @__PURE__ */ jsx(Eye, { size: 18 })
            }
          ),
          /* @__PURE__ */ jsx(
            "button",
            {
              onClick: () => navigate(`/admin/blog/${post.id}`),
              className: "p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition",
              children: /* @__PURE__ */ jsx(Edit, { size: 18 })
            }
          ),
          /* @__PURE__ */ jsx(
            "button",
            {
              onClick: () => deletePost(post.id),
              className: "p-2 text-red-600 hover:bg-red-50 rounded-lg transition",
              children: /* @__PURE__ */ jsx(Trash2, { size: 18 })
            }
          )
        ] }) })
      ] }, post.id)) })
    ] }) })
  ] }) });
}
function BlogEditor() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showMediaPicker, setShowMediaPicker] = useState(false);
  const [mediaPickerTarget, setMediaPickerTarget] = useState("content");
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    excerpt: "",
    content: "",
    featured_image_url: "",
    meta_description: "",
    meta_keywords: "",
    published: false
  });
  useEffect(() => {
    if (id && id !== "new") {
      fetchPost();
    }
  }, [id]);
  const fetchPost = async () => {
    const { data } = await supabase.from("blog_posts").select("*").eq("id", id).single();
    if (data) setFormData(data);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const payload = { ...formData };
      if (formData.published && !formData.published) {
        payload.published_at = (/* @__PURE__ */ new Date()).toISOString();
      }
      if (id === "new") {
        await supabase.from("blog_posts").insert([payload]);
      } else {
        await supabase.from("blog_posts").update(payload).eq("id", id);
      }
      navigate("/admin/blog");
    } catch (error) {
      console.error("Error saving post:", error);
    } finally {
      setLoading(false);
    }
  };
  return /* @__PURE__ */ jsxs(AdminLayout, { children: [
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsxs(
        "button",
        {
          onClick: () => navigate("/admin/blog"),
          className: "flex items-center gap-2 text-gray-600 hover:text-gray-800 mb-6",
          children: [
            /* @__PURE__ */ jsx(ArrowLeft, { size: 20 }),
            "Retour au blog"
          ]
        }
      ),
      /* @__PURE__ */ jsx("h1", { className: "text-3xl font-bold text-gray-800 mb-8", children: id === "new" ? "Nouvel article" : "Modifier l'article" }),
      /* @__PURE__ */ jsxs("form", { onSubmit: handleSubmit, className: "space-y-6", children: [
        /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-xl shadow-lg p-8", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-lg font-semibold text-gray-800 mb-6", children: "Informations de base" }),
          /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-6 mb-6", children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700 mb-2", children: "Titre de l'article *" }),
              /* @__PURE__ */ jsx(
                "input",
                {
                  type: "text",
                  value: formData.title,
                  onChange: (e) => setFormData({ ...formData, title: e.target.value }),
                  required: true,
                  className: "w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500",
                  placeholder: "Ex: Les avantages du transport VSL"
                }
              )
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700 mb-2", children: "Slug (URL) *" }),
              /* @__PURE__ */ jsx(
                "input",
                {
                  type: "text",
                  value: formData.slug,
                  onChange: (e) => setFormData({ ...formData, slug: e.target.value }),
                  required: true,
                  className: "w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500",
                  placeholder: "Ex: avantages-transport-vsl"
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "mb-6", children: [
            /* @__PURE__ */ jsxs("label", { className: "block text-sm font-medium text-gray-700 mb-2", children: [
              /* @__PURE__ */ jsx(Image$1, { className: "inline mr-2", size: 16 }),
              "Image mise en avant"
            ] }),
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "url",
                value: formData.featured_image_url,
                onChange: (e) => setFormData({ ...formData, featured_image_url: e.target.value }),
                placeholder: "https://example.com/image.jpg",
                className: "w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              }
            ),
            /* @__PURE__ */ jsx("div", { className: "flex gap-2 mt-2", children: /* @__PURE__ */ jsxs(
              "button",
              {
                type: "button",
                onClick: () => {
                  setMediaPickerTarget("featured");
                  setShowMediaPicker(true);
                },
                className: "flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition text-sm",
                children: [
                  /* @__PURE__ */ jsx(Image$1, { size: 16 }),
                  "Choisir depuis la médiathèque"
                ]
              }
            ) }),
            formData.featured_image_url && /* @__PURE__ */ jsx("div", { className: "mt-3", children: /* @__PURE__ */ jsx(
              "img",
              {
                src: formData.featured_image_url,
                alt: "Aperçu",
                className: "h-48 w-full object-cover rounded-lg border",
                onError: (e) => {
                  e.currentTarget.style.display = "none";
                }
              }
            ) })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "mb-6", children: [
            /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700 mb-2", children: "Extrait (résumé)" }),
            /* @__PURE__ */ jsx(
              "textarea",
              {
                value: formData.excerpt,
                onChange: (e) => setFormData({ ...formData, excerpt: e.target.value }),
                rows: 2,
                className: "w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500",
                placeholder: "Court résumé de l'article..."
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-xl shadow-lg p-8", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-lg font-semibold text-gray-800 mb-6", children: "Contenu de l'article" }),
          /* @__PURE__ */ jsxs("div", { className: "mb-6", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center mb-2", children: [
              /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700", children: "Contenu *" }),
              /* @__PURE__ */ jsxs("div", { className: "flex gap-2", children: [
                /* @__PURE__ */ jsx(
                  "button",
                  {
                    type: "button",
                    onClick: () => {
                      const textarea = document.querySelector('textarea[rows="20"]');
                      if (textarea) {
                        const start = textarea.selectionStart;
                        const end = textarea.selectionEnd;
                        const text = formData.content;
                        const before = text.substring(0, start);
                        const selected = text.substring(start, end);
                        const after = text.substring(end);
                        setFormData({ ...formData, content: before + "<strong>" + selected + "</strong>" + after });
                      }
                    },
                    className: "px-2 py-1 text-xs bg-gray-100 hover:bg-gray-200 rounded",
                    title: "Gras",
                    children: /* @__PURE__ */ jsx("strong", { children: "B" })
                  }
                ),
                /* @__PURE__ */ jsx(
                  "button",
                  {
                    type: "button",
                    onClick: () => {
                      const textarea = document.querySelector('textarea[rows="20"]');
                      if (textarea) {
                        const start = textarea.selectionStart;
                        const end = textarea.selectionEnd;
                        const text = formData.content;
                        const before = text.substring(0, start);
                        const selected = text.substring(start, end);
                        const after = text.substring(end);
                        setFormData({ ...formData, content: before + "<em>" + selected + "</em>" + after });
                      }
                    },
                    className: "px-2 py-1 text-xs bg-gray-100 hover:bg-gray-200 rounded italic",
                    title: "Italique",
                    children: "I"
                  }
                ),
                /* @__PURE__ */ jsx(
                  "button",
                  {
                    type: "button",
                    onClick: () => {
                      setFormData({ ...formData, content: formData.content + "\n<h2>Titre</h2>\n" });
                    },
                    className: "px-2 py-1 text-xs bg-gray-100 hover:bg-gray-200 rounded",
                    title: "Ajouter H2",
                    children: "H2"
                  }
                ),
                /* @__PURE__ */ jsx(
                  "button",
                  {
                    type: "button",
                    onClick: () => {
                      setFormData({ ...formData, content: formData.content + "\n<h3>Sous-titre</h3>\n" });
                    },
                    className: "px-2 py-1 text-xs bg-gray-100 hover:bg-gray-200 rounded",
                    title: "Ajouter H3",
                    children: "H3"
                  }
                ),
                /* @__PURE__ */ jsxs(
                  "button",
                  {
                    type: "button",
                    onClick: () => {
                      setFormData({ ...formData, content: formData.content + "\n<p>Paragraphe</p>\n" });
                    },
                    className: "px-2 py-1 text-xs bg-gray-100 hover:bg-gray-200 rounded flex items-center gap-1",
                    title: "Ajouter paragraphe",
                    children: [
                      /* @__PURE__ */ jsx(AlignLeft, { size: 12 }),
                      " P"
                    ]
                  }
                ),
                /* @__PURE__ */ jsx(
                  "button",
                  {
                    type: "button",
                    onClick: () => {
                      setFormData({ ...formData, content: formData.content + "\n<ul>\n  <li>Élément 1</li>\n  <li>Élément 2</li>\n</ul>\n" });
                    },
                    className: "px-2 py-1 text-xs bg-gray-100 hover:bg-gray-200 rounded",
                    title: "Ajouter liste",
                    children: "UL"
                  }
                ),
                /* @__PURE__ */ jsxs(
                  "button",
                  {
                    type: "button",
                    onClick: () => {
                      setMediaPickerTarget("content");
                      setShowMediaPicker(true);
                    },
                    className: "px-2 py-1 text-xs bg-blue-100 hover:bg-blue-200 text-blue-700 rounded flex items-center gap-1 font-medium",
                    title: "Ajouter image depuis la médiathèque",
                    children: [
                      /* @__PURE__ */ jsx(Image$1, { size: 12 }),
                      " MEDIA"
                    ]
                  }
                )
              ] })
            ] }),
            /* @__PURE__ */ jsx(
              "textarea",
              {
                value: formData.content,
                onChange: (e) => setFormData({ ...formData, content: e.target.value }),
                required: true,
                rows: 20,
                className: "w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 font-mono text-sm",
                placeholder: "Contenu de l'article en HTML..."
              }
            ),
            /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center mt-2", children: [
              /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-500", children: "Vous pouvez utiliser du HTML pour formater le contenu (balises: <h2>, <p>, <ul>, <li>, <strong>, <em>, etc.)" }),
              /* @__PURE__ */ jsxs(
                "button",
                {
                  type: "button",
                  onClick: () => {
                    navigator.clipboard.writeText(formData.content);
                    alert("Contenu copié dans le presse-papier");
                  },
                  className: "flex items-center gap-1 px-2 py-1 text-xs text-blue-600 hover:text-blue-700",
                  children: [
                    /* @__PURE__ */ jsx(Copy, { size: 12 }),
                    " Copier"
                  ]
                }
              )
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-xl shadow-lg p-8", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-lg font-semibold text-gray-800 mb-6", children: "SEO & Métadonnées" }),
          /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-6 mb-6", children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700 mb-2", children: "Meta Description" }),
              /* @__PURE__ */ jsx(
                "textarea",
                {
                  value: formData.meta_description,
                  onChange: (e) => setFormData({ ...formData, meta_description: e.target.value }),
                  rows: 3,
                  className: "w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500",
                  placeholder: "Description pour les moteurs de recherche"
                }
              ),
              /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-500 mt-1", children: "Recommandé: 150-160 caractères" })
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700 mb-2", children: "Meta Keywords" }),
              /* @__PURE__ */ jsx(
                "input",
                {
                  type: "text",
                  value: formData.meta_keywords,
                  onChange: (e) => setFormData({ ...formData, meta_keywords: e.target.value }),
                  className: "w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500",
                  placeholder: "vsl, taxi, paris, transport"
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "mb-6", children: /* @__PURE__ */ jsxs("label", { className: "flex items-center gap-2 cursor-pointer p-4 bg-blue-50 rounded-lg border border-blue-200", children: [
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "checkbox",
                checked: formData.published,
                onChange: (e) => setFormData({ ...formData, published: e.target.checked }),
                className: "w-5 h-5"
              }
            ),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("span", { className: "text-sm font-medium text-gray-700", children: "Publier cet article" }),
              /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-500", children: "L'article sera visible sur le site" })
            ] })
          ] }) })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "bg-white rounded-xl shadow-lg p-8", children: /* @__PURE__ */ jsxs("div", { className: "flex gap-4", children: [
          /* @__PURE__ */ jsxs(
            "button",
            {
              type: "submit",
              disabled: loading,
              className: "flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition disabled:bg-gray-400",
              children: [
                /* @__PURE__ */ jsx(Save, { size: 20 }),
                loading ? "Enregistrement..." : "Enregistrer"
              ]
            }
          ),
          id !== "new" && /* @__PURE__ */ jsxs(
            "a",
            {
              href: `/blog/${formData.slug}`,
              target: "_blank",
              rel: "noopener noreferrer",
              className: "flex items-center gap-2 px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition",
              children: [
                /* @__PURE__ */ jsx(Eye, { size: 20 }),
                "Aperçu"
              ]
            }
          )
        ] }) })
      ] })
    ] }),
    showMediaPicker && /* @__PURE__ */ jsx(
      MediaPicker,
      {
        onSelect: (url) => {
          if (mediaPickerTarget === "featured") {
            setFormData({ ...formData, featured_image_url: url });
          } else {
            setFormData({ ...formData, content: formData.content + `
<img src="${url}" alt="Image" class="w-full rounded-lg my-4" />
` });
          }
        },
        onClose: () => setShowMediaPicker(false)
      }
    )
  ] });
}
function Settings() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [settings, setSettings] = useState({
    google_analytics: "",
    site_name: "",
    site_description: "",
    contact_email: "",
    contact_phone: "",
    contact_address: ""
  });
  useEffect(() => {
    fetchSettings();
  }, []);
  const fetchSettings = async () => {
    const { data } = await supabase.from("settings").select("*");
    if (data) {
      const settingsMap = {};
      data.forEach((item) => {
        var _a2;
        if (item.key === "google_analytics" && ((_a2 = item.value) == null ? void 0 : _a2.measurement_id)) {
          settingsMap.google_analytics = item.value.measurement_id;
        } else if (item.value) {
          settingsMap[item.key] = typeof item.value === "object" ? JSON.stringify(item.value) : item.value;
        }
      });
      setSettings((prev) => ({ ...prev, ...settingsMap }));
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);
    try {
      const updates = [
        { key: "google_analytics", value: { measurement_id: settings.google_analytics } },
        { key: "site_name", value: settings.site_name },
        { key: "site_description", value: settings.site_description },
        { key: "contact_email", value: settings.contact_email },
        { key: "contact_phone", value: settings.contact_phone },
        { key: "contact_address", value: settings.contact_address }
      ];
      for (const update of updates) {
        await supabase.from("settings").update({ value: update.value }).eq("key", update.key);
      }
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3e3);
    } catch (error) {
      console.error("Error saving settings:", error);
    } finally {
      setLoading(false);
    }
  };
  return /* @__PURE__ */ jsx(AdminLayout, { children: /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsx("h1", { className: "text-3xl font-bold text-gray-800 mb-8", children: "Paramètres" }),
    /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
      /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-xl shadow-lg p-8", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 mb-6", children: [
          /* @__PURE__ */ jsx("div", { className: "p-3 bg-green-100 rounded-lg", children: /* @__PURE__ */ jsx(Globe, { className: "text-green-600", size: 24 }) }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("h2", { className: "text-xl font-bold text-gray-800", children: "Informations du site" }),
            /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-600", children: "Nom, description et identité du site" })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700 mb-2", children: "Nom du site" }),
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "text",
                value: settings.site_name,
                onChange: (e) => setSettings({ ...settings, site_name: e.target.value }),
                placeholder: "Ex: Taxi VSL Paris",
                className: "w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700 mb-2", children: "Description du site" }),
            /* @__PURE__ */ jsx(
              "textarea",
              {
                value: settings.site_description,
                onChange: (e) => setSettings({ ...settings, site_description: e.target.value }),
                placeholder: "Description générale du site...",
                rows: 3,
                className: "w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              }
            )
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-xl shadow-lg p-8", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 mb-6", children: [
          /* @__PURE__ */ jsx("div", { className: "p-3 bg-purple-100 rounded-lg", children: /* @__PURE__ */ jsx(Phone, { className: "text-purple-600", size: 24 }) }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("h2", { className: "text-xl font-bold text-gray-800", children: "Informations de contact" }),
            /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-600", children: "Email, téléphone et adresse" })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsxs("label", { className: "block text-sm font-medium text-gray-700 mb-2", children: [
              /* @__PURE__ */ jsx(Mail, { className: "inline mr-2", size: 16 }),
              "Email de contact"
            ] }),
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "email",
                value: settings.contact_email,
                onChange: (e) => setSettings({ ...settings, contact_email: e.target.value }),
                placeholder: "contact@example.com",
                className: "w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsxs("label", { className: "block text-sm font-medium text-gray-700 mb-2", children: [
              /* @__PURE__ */ jsx(Phone, { className: "inline mr-2", size: 16 }),
              "Téléphone"
            ] }),
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "tel",
                value: settings.contact_phone,
                onChange: (e) => setSettings({ ...settings, contact_phone: e.target.value }),
                placeholder: "01 23 45 67 89",
                className: "w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsxs("label", { className: "block text-sm font-medium text-gray-700 mb-2", children: [
              /* @__PURE__ */ jsx(MapPin, { className: "inline mr-2", size: 16 }),
              "Adresse"
            ] }),
            /* @__PURE__ */ jsx(
              "textarea",
              {
                value: settings.contact_address,
                onChange: (e) => setSettings({ ...settings, contact_address: e.target.value }),
                placeholder: "Adresse complète...",
                rows: 2,
                className: "w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              }
            )
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-xl shadow-lg p-8", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 mb-6", children: [
          /* @__PURE__ */ jsx("div", { className: "p-3 bg-blue-100 rounded-lg", children: /* @__PURE__ */ jsx(BarChart, { className: "text-blue-600", size: 24 }) }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("h2", { className: "text-xl font-bold text-gray-800", children: "Google Analytics" }),
            /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-600", children: "Configuration du tracking analytics" })
          ] })
        ] }),
        success && /* @__PURE__ */ jsx("div", { className: "mb-6 p-4 bg-green-50 border border-green-200 rounded-lg text-green-800", children: "Paramètres enregistrés avec succès" }),
        /* @__PURE__ */ jsxs("form", { onSubmit: handleSubmit, children: [
          /* @__PURE__ */ jsxs("div", { className: "mb-6", children: [
            /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700 mb-2", children: "Measurement ID (GA4)" }),
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "text",
                value: settings.google_analytics,
                onChange: (e) => setSettings({ ...settings, google_analytics: e.target.value }),
                placeholder: "G-XXXXXXXXXX",
                className: "w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              }
            ),
            /* @__PURE__ */ jsx("p", { className: "mt-2 text-sm text-gray-500", children: "Trouvez votre Measurement ID dans Google Analytics 4 → Admin → Data Streams" })
          ] }),
          /* @__PURE__ */ jsxs(
            "button",
            {
              type: "submit",
              disabled: loading,
              className: "flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition disabled:bg-gray-400",
              children: [
                /* @__PURE__ */ jsx(Save, { size: 20 }),
                loading ? "Enregistrement..." : "Enregistrer"
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg", children: [
          /* @__PURE__ */ jsx("h3", { className: "font-semibold text-blue-900 mb-2", children: "Comment configurer ?" }),
          /* @__PURE__ */ jsxs("ol", { className: "list-decimal list-inside space-y-2 text-blue-800 text-sm", children: [
            /* @__PURE__ */ jsx("li", { children: "Créez un compte Google Analytics sur analytics.google.com" }),
            /* @__PURE__ */ jsx("li", { children: "Créez une propriété GA4 pour votre site" }),
            /* @__PURE__ */ jsx("li", { children: "Copiez le Measurement ID (format: G-XXXXXXXXXX)" }),
            /* @__PURE__ */ jsx("li", { children: "Collez-le dans le champ ci-dessus et enregistrez" }),
            /* @__PURE__ */ jsx("li", { children: "Le tracking sera automatiquement activé sur votre site" })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "bg-white rounded-xl shadow-lg p-8", children: /* @__PURE__ */ jsxs(
        "button",
        {
          onClick: handleSubmit,
          disabled: loading,
          className: "w-full flex items-center justify-center gap-2 px-6 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition disabled:bg-gray-400 font-semibold text-lg",
          children: [
            /* @__PURE__ */ jsx(Save, { size: 24 }),
            loading ? "Enregistrement en cours..." : "Enregistrer tous les paramètres"
          ]
        }
      ) })
    ] })
  ] }) });
}
function DragDropUpload({
  onFilesSelected,
  accept = "image/*,video/*,application/pdf",
  multiple = true,
  maxSize = 10 * 1024 * 1024
}) {
  const [isDragging, setIsDragging] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [errors, setErrors] = useState([]);
  const validateFile = (file) => {
    if (file.size > maxSize) {
      return `${file.name} est trop volumineux (max ${Math.round(maxSize / 1024 / 1024)}MB)`;
    }
    return null;
  };
  const handleFiles = (files) => {
    if (!files) return;
    const fileArray = Array.from(files);
    const validFiles = [];
    const newErrors = [];
    fileArray.forEach((file) => {
      const error = validateFile(file);
      if (error) {
        newErrors.push(error);
      } else {
        validFiles.push(file);
      }
    });
    setErrors(newErrors);
    if (validFiles.length > 0) {
      setSelectedFiles((prev) => [...prev, ...validFiles]);
      onFilesSelected(validFiles);
    }
  };
  const handleDragEnter = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);
  const handleDragLeave = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);
  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);
  const handleDrop = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    const files = e.dataTransfer.files;
    handleFiles(files);
  }, []);
  const handleFileInput = (e) => {
    handleFiles(e.target.files);
  };
  const removeFile = (index) => {
    setSelectedFiles((prev) => prev.filter((_, i) => i !== index));
  };
  const clearAll = () => {
    setSelectedFiles([]);
    setErrors([]);
  };
  return /* @__PURE__ */ jsxs("div", { className: "w-full", children: [
    /* @__PURE__ */ jsxs(
      "div",
      {
        onDragEnter: handleDragEnter,
        onDragOver: handleDragOver,
        onDragLeave: handleDragLeave,
        onDrop: handleDrop,
        className: `relative border-2 border-dashed rounded-xl p-8 transition-all ${isDragging ? "border-blue-500 bg-blue-50" : "border-gray-300 bg-gray-50 hover:border-gray-400"}`,
        children: [
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "file",
              onChange: handleFileInput,
              accept,
              multiple,
              className: "absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            }
          ),
          /* @__PURE__ */ jsxs("div", { className: "text-center pointer-events-none", children: [
            /* @__PURE__ */ jsx("div", { className: "mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4", children: isDragging ? /* @__PURE__ */ jsx(Image$1, { className: "text-blue-600", size: 32 }) : /* @__PURE__ */ jsx(Upload, { className: "text-blue-600", size: 32 }) }),
            /* @__PURE__ */ jsx("h3", { className: "text-lg font-semibold text-gray-800 mb-2", children: isDragging ? "Déposez vos fichiers ici" : "Glissez-déposez vos fichiers" }),
            /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-600 mb-2", children: "ou cliquez pour parcourir" }),
            /* @__PURE__ */ jsxs("p", { className: "text-xs text-gray-500", children: [
              "Images, vidéos, PDF acceptés (max ",
              Math.round(maxSize / 1024 / 1024),
              "MB)"
            ] })
          ] })
        ]
      }
    ),
    errors.length > 0 && /* @__PURE__ */ jsx("div", { className: "mt-4 space-y-2", children: errors.map((error, index) => /* @__PURE__ */ jsx("div", { className: "px-4 py-2 bg-red-50 border border-red-200 rounded-lg text-sm text-red-800", children: error }, index)) }),
    selectedFiles.length > 0 && /* @__PURE__ */ jsxs("div", { className: "mt-6", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center mb-3", children: [
        /* @__PURE__ */ jsxs("h4", { className: "text-sm font-semibold text-gray-700", children: [
          "Fichiers sélectionnés (",
          selectedFiles.length,
          ")"
        ] }),
        /* @__PURE__ */ jsx(
          "button",
          {
            onClick: clearAll,
            className: "text-xs text-red-600 hover:text-red-700 font-medium",
            children: "Tout effacer"
          }
        )
      ] }),
      /* @__PURE__ */ jsx("div", { className: "space-y-2 max-h-48 overflow-y-auto", children: selectedFiles.map((file, index) => /* @__PURE__ */ jsxs(
        "div",
        {
          className: "flex items-center justify-between px-4 py-3 bg-white border rounded-lg",
          children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 flex-1 min-w-0", children: [
              /* @__PURE__ */ jsx("div", { className: "w-10 h-10 bg-blue-100 rounded flex items-center justify-center flex-shrink-0", children: /* @__PURE__ */ jsx(Image$1, { size: 20, className: "text-blue-600" }) }),
              /* @__PURE__ */ jsxs("div", { className: "flex-1 min-w-0", children: [
                /* @__PURE__ */ jsx("p", { className: "text-sm font-medium text-gray-800 truncate", children: file.name }),
                /* @__PURE__ */ jsxs("p", { className: "text-xs text-gray-500", children: [
                  (file.size / 1024).toFixed(2),
                  " KB"
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsx(
              "button",
              {
                onClick: () => removeFile(index),
                className: "p-1 text-gray-400 hover:text-red-600 transition flex-shrink-0",
                children: /* @__PURE__ */ jsx(X, { size: 18 })
              }
            )
          ]
        },
        index
      )) })
    ] })
  ] });
}
function LoadingSkeleton({ type = "card", count = 3 }) {
  const renderCard = () => /* @__PURE__ */ jsxs("div", { className: "border rounded-lg overflow-hidden animate-pulse", children: [
    /* @__PURE__ */ jsx("div", { className: "aspect-video bg-gray-200" }),
    /* @__PURE__ */ jsxs("div", { className: "p-4 space-y-3", children: [
      /* @__PURE__ */ jsx("div", { className: "h-4 bg-gray-200 rounded w-3/4" }),
      /* @__PURE__ */ jsx("div", { className: "h-3 bg-gray-200 rounded w-1/2" }),
      /* @__PURE__ */ jsxs("div", { className: "flex gap-2", children: [
        /* @__PURE__ */ jsx("div", { className: "h-8 bg-gray-200 rounded flex-1" }),
        /* @__PURE__ */ jsx("div", { className: "h-8 w-8 bg-gray-200 rounded" }),
        /* @__PURE__ */ jsx("div", { className: "h-8 w-8 bg-gray-200 rounded" })
      ] })
    ] })
  ] });
  const renderList = () => /* @__PURE__ */ jsx("div", { className: "p-4 border-b animate-pulse", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4", children: [
    /* @__PURE__ */ jsx("div", { className: "w-24 h-24 bg-gray-200 rounded-lg" }),
    /* @__PURE__ */ jsxs("div", { className: "flex-1 space-y-2", children: [
      /* @__PURE__ */ jsx("div", { className: "h-4 bg-gray-200 rounded w-1/2" }),
      /* @__PURE__ */ jsx("div", { className: "h-3 bg-gray-200 rounded w-1/4" })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "flex gap-2", children: [
      /* @__PURE__ */ jsx("div", { className: "h-8 w-20 bg-gray-200 rounded" }),
      /* @__PURE__ */ jsx("div", { className: "h-8 w-8 bg-gray-200 rounded" })
    ] })
  ] }) });
  const renderTable = () => /* @__PURE__ */ jsxs("tr", { className: "border-b animate-pulse", children: [
    /* @__PURE__ */ jsx("td", { className: "px-6 py-4", children: /* @__PURE__ */ jsx("div", { className: "h-4 bg-gray-200 rounded w-3/4" }) }),
    /* @__PURE__ */ jsx("td", { className: "px-6 py-4", children: /* @__PURE__ */ jsx("div", { className: "h-4 bg-gray-200 rounded w-1/2" }) }),
    /* @__PURE__ */ jsx("td", { className: "px-6 py-4", children: /* @__PURE__ */ jsx("div", { className: "h-6 bg-gray-200 rounded-full w-20" }) }),
    /* @__PURE__ */ jsx("td", { className: "px-6 py-4", children: /* @__PURE__ */ jsx("div", { className: "h-4 bg-gray-200 rounded w-1/4" }) }),
    /* @__PURE__ */ jsx("td", { className: "px-6 py-4", children: /* @__PURE__ */ jsxs("div", { className: "flex gap-2 justify-end", children: [
      /* @__PURE__ */ jsx("div", { className: "h-8 w-8 bg-gray-200 rounded" }),
      /* @__PURE__ */ jsx("div", { className: "h-8 w-8 bg-gray-200 rounded" }),
      /* @__PURE__ */ jsx("div", { className: "h-8 w-8 bg-gray-200 rounded" })
    ] }) })
  ] });
  const renderText = () => /* @__PURE__ */ jsxs("div", { className: "space-y-2 animate-pulse", children: [
    /* @__PURE__ */ jsx("div", { className: "h-4 bg-gray-200 rounded w-full" }),
    /* @__PURE__ */ jsx("div", { className: "h-4 bg-gray-200 rounded w-5/6" }),
    /* @__PURE__ */ jsx("div", { className: "h-4 bg-gray-200 rounded w-4/6" })
  ] });
  const items = Array.from({ length: count }, (_, i) => i);
  if (type === "card") {
    return /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6", children: items.map((i) => /* @__PURE__ */ jsx("div", { children: renderCard() }, i)) });
  }
  if (type === "list") {
    return /* @__PURE__ */ jsx("div", { className: "divide-y", children: items.map((i) => /* @__PURE__ */ jsx("div", { children: renderList() }, i)) });
  }
  if (type === "table") {
    return /* @__PURE__ */ jsx(Fragment, { children: items.map((i) => renderTable()) });
  }
  return /* @__PURE__ */ jsx(Fragment, { children: items.map((i) => /* @__PURE__ */ jsx("div", { className: "mb-4", children: renderText() }, i)) });
}
function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  itemsPerPage,
  totalItems
}) {
  if (totalPages <= 1) return null;
  const pages = [];
  const maxVisible = 5;
  let startPage = Math.max(1, currentPage - Math.floor(maxVisible / 2));
  let endPage = Math.min(totalPages, startPage + maxVisible - 1);
  if (endPage - startPage + 1 < maxVisible) {
    startPage = Math.max(1, endPage - maxVisible + 1);
  }
  for (let i = startPage; i <= endPage; i++) {
    pages.push(i);
  }
  return /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between px-6 py-4 border-t bg-gray-50", children: [
    /* @__PURE__ */ jsx("div", { className: "text-sm text-gray-700", children: itemsPerPage && totalItems && /* @__PURE__ */ jsxs("span", { children: [
      "Affichage de",
      " ",
      /* @__PURE__ */ jsx("span", { className: "font-medium", children: Math.min((currentPage - 1) * itemsPerPage + 1, totalItems) }),
      " ",
      "à",
      " ",
      /* @__PURE__ */ jsx("span", { className: "font-medium", children: Math.min(currentPage * itemsPerPage, totalItems) }),
      " ",
      "sur",
      " ",
      /* @__PURE__ */ jsx("span", { className: "font-medium", children: totalItems }),
      " ",
      "résultats"
    ] }) }),
    /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
      /* @__PURE__ */ jsxs(
        "button",
        {
          onClick: () => onPageChange(currentPage - 1),
          disabled: currentPage === 1,
          className: "flex items-center gap-1 px-3 py-2 text-sm font-medium text-gray-700 bg-white border rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition",
          children: [
            /* @__PURE__ */ jsx(ChevronLeft, { size: 16 }),
            "Précédent"
          ]
        }
      ),
      /* @__PURE__ */ jsxs("div", { className: "hidden sm:flex gap-1", children: [
        startPage > 1 && /* @__PURE__ */ jsxs(Fragment, { children: [
          /* @__PURE__ */ jsx(
            "button",
            {
              onClick: () => onPageChange(1),
              className: "px-3 py-2 text-sm font-medium text-gray-700 bg-white border rounded-lg hover:bg-gray-50 transition",
              children: "1"
            }
          ),
          startPage > 2 && /* @__PURE__ */ jsx("span", { className: "px-3 py-2 text-gray-500", children: "..." })
        ] }),
        pages.map((page) => /* @__PURE__ */ jsx(
          "button",
          {
            onClick: () => onPageChange(page),
            className: `px-3 py-2 text-sm font-medium rounded-lg transition ${currentPage === page ? "bg-blue-600 text-white" : "text-gray-700 bg-white border hover:bg-gray-50"}`,
            children: page
          },
          page
        )),
        endPage < totalPages && /* @__PURE__ */ jsxs(Fragment, { children: [
          endPage < totalPages - 1 && /* @__PURE__ */ jsx("span", { className: "px-3 py-2 text-gray-500", children: "..." }),
          /* @__PURE__ */ jsx(
            "button",
            {
              onClick: () => onPageChange(totalPages),
              className: "px-3 py-2 text-sm font-medium text-gray-700 bg-white border rounded-lg hover:bg-gray-50 transition",
              children: totalPages
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxs(
        "button",
        {
          onClick: () => onPageChange(currentPage + 1),
          disabled: currentPage === totalPages,
          className: "flex items-center gap-1 px-3 py-2 text-sm font-medium text-gray-700 bg-white border rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition",
          children: [
            "Suivant",
            /* @__PURE__ */ jsx(ChevronRight, { size: 16 })
          ]
        }
      )
    ] })
  ] });
}
function MediaManagerEnhanced() {
  const [media, setMedia] = useState([]);
  const [filteredMedia, setFilteredMedia] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedMedia, setSelectedMedia] = useState(/* @__PURE__ */ new Set());
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("date");
  const [sortOrder, setSortOrder] = useState("desc");
  const [filterType, setFilterType] = useState("all");
  const [viewMode, setViewMode] = useState("grid");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(12);
  const [showUploadForm, setShowUploadForm] = useState(false);
  const [uploading, setUploading] = useState(false);
  const toast = useToast();
  useEffect(() => {
    fetchMedia();
  }, []);
  useEffect(() => {
    let filtered = [...media];
    if (searchTerm) {
      filtered = filtered.filter(
        (item) => item.filename.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    if (filterType !== "all") {
      filtered = filtered.filter((item) => {
        if (filterType === "image") return item.mime_type.startsWith("image/");
        if (filterType === "video") return item.mime_type.startsWith("video/");
        if (filterType === "pdf") return item.mime_type === "application/pdf";
        return true;
      });
    }
    filtered.sort((a, b) => {
      let comparison = 0;
      if (sortBy === "date") {
        comparison = new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
      } else if (sortBy === "name") {
        comparison = a.filename.localeCompare(b.filename);
      } else if (sortBy === "size") {
        comparison = a.size - b.size;
      }
      return sortOrder === "asc" ? comparison : -comparison;
    });
    setFilteredMedia(filtered);
    setCurrentPage(1);
  }, [searchTerm, filterType, sortBy, sortOrder, media]);
  const paginatedMedia = filteredMedia.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  const totalPages = Math.ceil(filteredMedia.length / itemsPerPage);
  const fetchMedia = async () => {
    setLoading(true);
    const { data } = await supabase.from("media").select("*").order("created_at", { ascending: false });
    if (data) {
      setMedia(data);
      setFilteredMedia(data);
    }
    setLoading(false);
  };
  const uploadFiles = async (files) => {
    setUploading(true);
    let successCount = 0;
    let errorCount = 0;
    for (const file of files) {
      try {
        const fileExt = file.name.split(".").pop();
        const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
        const { error: uploadError } = await supabase.storage.from("media").upload(fileName, file, {
          cacheControl: "3600",
          upsert: false
        });
        if (uploadError) throw uploadError;
        const { data: { publicUrl } } = supabase.storage.from("media").getPublicUrl(fileName);
        await supabase.from("media").insert([{
          filename: file.name,
          url: publicUrl,
          mime_type: file.type,
          size: file.size
        }]);
        successCount++;
      } catch (error) {
        console.error("Error uploading file:", error);
        errorCount++;
      }
    }
    setUploading(false);
    setShowUploadForm(false);
    if (successCount > 0) {
      toast.success(`${successCount} fichier(s) uploadé(s) avec succès`);
      fetchMedia();
    }
    if (errorCount > 0) {
      toast.error(`${errorCount} fichier(s) n'ont pas pu être uploadés`);
    }
  };
  const deleteMedia = async (id) => {
    if (!confirm("Supprimer ce fichier ?")) return;
    const { error } = await supabase.from("media").delete().eq("id", id);
    if (error) {
      toast.error("Erreur lors de la suppression");
    } else {
      toast.success("Fichier supprimé");
      fetchMedia();
    }
  };
  const deleteBulk = async () => {
    if (selectedMedia.size === 0) return;
    if (!confirm(`Supprimer ${selectedMedia.size} fichier(s) ?`)) return;
    const ids = Array.from(selectedMedia);
    const { error } = await supabase.from("media").delete().in("id", ids);
    if (error) {
      toast.error("Erreur lors de la suppression");
    } else {
      toast.success(`${selectedMedia.size} fichier(s) supprimé(s)`);
      setSelectedMedia(/* @__PURE__ */ new Set());
      fetchMedia();
    }
  };
  const toggleSelect = (id) => {
    const newSelected = new Set(selectedMedia);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedMedia(newSelected);
  };
  const selectAll = () => {
    if (selectedMedia.size === paginatedMedia.length) {
      setSelectedMedia(/* @__PURE__ */ new Set());
    } else {
      setSelectedMedia(new Set(paginatedMedia.map((m) => m.id)));
    }
  };
  const copyToClipboard = (url) => {
    navigator.clipboard.writeText(url);
    toast.success("URL copiée dans le presse-papier");
  };
  const formatFileSize = (bytes) => {
    if (bytes === 0) return "N/A";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + " " + sizes[i];
  };
  return /* @__PURE__ */ jsxs(AdminLayout, { children: [
    /* @__PURE__ */ jsx(toast.ToastContainer, {}),
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h1", { className: "text-3xl font-bold text-gray-800", children: "Gestionnaire de médias" }),
          /* @__PURE__ */ jsxs("p", { className: "text-gray-600 mt-2", children: [
            filteredMedia.length,
            " fichier",
            filteredMedia.length > 1 ? "s" : "",
            selectedMedia.size > 0 && ` • ${selectedMedia.size} sélectionné${selectedMedia.size > 1 ? "s" : ""}`
          ] })
        ] }),
        /* @__PURE__ */ jsxs(
          "button",
          {
            onClick: () => setShowUploadForm(!showUploadForm),
            className: "flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition",
            children: [
              /* @__PURE__ */ jsx(Image$1, { size: 20 }),
              "Ajouter des fichiers"
            ]
          }
        )
      ] }),
      showUploadForm && /* @__PURE__ */ jsxs("div", { className: "mb-8 bg-white rounded-xl shadow-lg p-6", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-lg font-semibold text-gray-800 mb-4", children: "Uploader de nouveaux fichiers" }),
        /* @__PURE__ */ jsx(
          DragDropUpload,
          {
            onFilesSelected: (files) => {
              if (!uploading) {
                uploadFiles(files);
              }
            }
          }
        ),
        uploading && /* @__PURE__ */ jsx("div", { className: "mt-4 text-center text-gray-600", children: "Upload en cours..." })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-xl shadow-lg p-6 mb-6", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex flex-col lg:flex-row gap-4", children: [
          /* @__PURE__ */ jsxs("div", { className: "relative flex-1", children: [
            /* @__PURE__ */ jsx(Search, { className: "absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400", size: 18 }),
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "text",
                value: searchTerm,
                onChange: (e) => setSearchTerm(e.target.value),
                placeholder: "Rechercher par nom...",
                className: "w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap gap-2", children: [
            /* @__PURE__ */ jsxs(
              "select",
              {
                value: filterType,
                onChange: (e) => setFilterType(e.target.value),
                className: "px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 bg-white",
                children: [
                  /* @__PURE__ */ jsx("option", { value: "all", children: "Tous les types" }),
                  /* @__PURE__ */ jsx("option", { value: "image", children: "Images" }),
                  /* @__PURE__ */ jsx("option", { value: "video", children: "Vidéos" }),
                  /* @__PURE__ */ jsx("option", { value: "pdf", children: "PDF" })
                ]
              }
            ),
            /* @__PURE__ */ jsxs(
              "select",
              {
                value: sortBy,
                onChange: (e) => setSortBy(e.target.value),
                className: "px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 bg-white",
                children: [
                  /* @__PURE__ */ jsx("option", { value: "date", children: "Date" }),
                  /* @__PURE__ */ jsx("option", { value: "name", children: "Nom" }),
                  /* @__PURE__ */ jsx("option", { value: "size", children: "Taille" })
                ]
              }
            ),
            /* @__PURE__ */ jsx(
              "button",
              {
                onClick: () => setSortOrder(sortOrder === "asc" ? "desc" : "asc"),
                className: "px-4 py-2 border rounded-lg hover:bg-gray-50 transition",
                children: sortOrder === "asc" ? "↑" : "↓"
              }
            ),
            /* @__PURE__ */ jsxs("div", { className: "flex bg-gray-100 rounded-lg p-1", children: [
              /* @__PURE__ */ jsx(
                "button",
                {
                  onClick: () => setViewMode("grid"),
                  className: `p-2 rounded ${viewMode === "grid" ? "bg-white shadow" : "text-gray-600"}`,
                  title: "Vue grille",
                  children: /* @__PURE__ */ jsx(Grid, { size: 18 })
                }
              ),
              /* @__PURE__ */ jsx(
                "button",
                {
                  onClick: () => setViewMode("list"),
                  className: `p-2 rounded ${viewMode === "list" ? "bg-white shadow" : "text-gray-600"}`,
                  title: "Vue liste",
                  children: /* @__PURE__ */ jsx(List, { size: 18 })
                }
              )
            ] })
          ] })
        ] }),
        selectedMedia.size > 0 && /* @__PURE__ */ jsxs("div", { className: "mt-4 flex items-center gap-3 p-3 bg-blue-50 border border-blue-200 rounded-lg", children: [
          /* @__PURE__ */ jsx(
            "button",
            {
              onClick: selectAll,
              className: "text-blue-600 hover:text-blue-700 font-medium text-sm",
              children: selectedMedia.size === paginatedMedia.length ? "Tout désélectionner" : "Tout sélectionner"
            }
          ),
          /* @__PURE__ */ jsxs(
            "button",
            {
              onClick: deleteBulk,
              className: "flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition text-sm",
              children: [
                /* @__PURE__ */ jsx(Trash2, { size: 16 }),
                "Supprimer (",
                selectedMedia.size,
                ")"
              ]
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-xl shadow-lg overflow-hidden", children: [
        loading ? /* @__PURE__ */ jsx("div", { className: "p-6", children: /* @__PURE__ */ jsx(LoadingSkeleton, { type: viewMode === "grid" ? "card" : "list", count: itemsPerPage }) }) : filteredMedia.length === 0 ? /* @__PURE__ */ jsxs("div", { className: "p-12 text-center text-gray-500", children: [
          /* @__PURE__ */ jsx(Image$1, { className: "mx-auto mb-4 text-gray-400", size: 48 }),
          /* @__PURE__ */ jsx("p", { children: searchTerm ? "Aucun résultat pour votre recherche." : "Aucun média. Ajoutez votre première image." })
        ] }) : viewMode === "grid" ? /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-6", children: paginatedMedia.map((item) => /* @__PURE__ */ jsxs(
          "div",
          {
            className: `border rounded-lg overflow-hidden hover:shadow-lg transition cursor-pointer ${selectedMedia.has(item.id) ? "ring-2 ring-blue-500" : ""}`,
            onClick: () => toggleSelect(item.id),
            children: [
              /* @__PURE__ */ jsxs("div", { className: "aspect-video bg-gray-100 relative group", children: [
                /* @__PURE__ */ jsx(
                  "img",
                  {
                    src: item.url,
                    alt: item.filename,
                    className: "w-full h-full object-cover",
                    onError: (e) => {
                      e.currentTarget.src = "https://via.placeholder.com/400x300?text=Image+Error";
                    }
                  }
                ),
                /* @__PURE__ */ jsx("div", { className: "absolute top-2 left-2", children: selectedMedia.has(item.id) ? /* @__PURE__ */ jsx(CheckSquare, { className: "text-blue-600", size: 24, fill: "white" }) : /* @__PURE__ */ jsx(Square, { className: "text-white opacity-70 hover:opacity-100", size: 24 }) })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "p-4", children: [
                /* @__PURE__ */ jsx("p", { className: "font-medium text-gray-800 truncate mb-2", children: item.filename }),
                /* @__PURE__ */ jsxs("p", { className: "text-xs text-gray-500 mb-3", children: [
                  formatFileSize(item.size),
                  " • ",
                  new Date(item.created_at).toLocaleDateString("fr-FR")
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "flex gap-2", children: [
                  /* @__PURE__ */ jsxs(
                    "button",
                    {
                      onClick: (e) => {
                        e.stopPropagation();
                        copyToClipboard(item.url);
                      },
                      className: "flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition text-sm",
                      children: [
                        /* @__PURE__ */ jsx(Copy, { size: 16 }),
                        "Copier"
                      ]
                    }
                  ),
                  /* @__PURE__ */ jsx(
                    "a",
                    {
                      href: item.url,
                      target: "_blank",
                      rel: "noopener noreferrer",
                      onClick: (e) => e.stopPropagation(),
                      className: "p-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition",
                      children: /* @__PURE__ */ jsx(ExternalLink, { size: 16 })
                    }
                  ),
                  /* @__PURE__ */ jsx(
                    "button",
                    {
                      onClick: (e) => {
                        e.stopPropagation();
                        deleteMedia(item.id);
                      },
                      className: "p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition",
                      children: /* @__PURE__ */ jsx(Trash2, { size: 16 })
                    }
                  )
                ] })
              ] })
            ]
          },
          item.id
        )) }) : /* @__PURE__ */ jsx("div", { className: "divide-y", children: paginatedMedia.map((item) => /* @__PURE__ */ jsxs(
          "div",
          {
            className: `p-4 hover:bg-gray-50 transition flex items-center gap-4 cursor-pointer ${selectedMedia.has(item.id) ? "bg-blue-50" : ""}`,
            onClick: () => toggleSelect(item.id),
            children: [
              /* @__PURE__ */ jsx("div", { className: "flex-shrink-0", children: selectedMedia.has(item.id) ? /* @__PURE__ */ jsx(CheckSquare, { className: "text-blue-600", size: 20 }) : /* @__PURE__ */ jsx(Square, { className: "text-gray-400", size: 20 }) }),
              /* @__PURE__ */ jsx(
                "img",
                {
                  src: item.url,
                  alt: item.filename,
                  className: "w-24 h-24 object-cover rounded-lg border",
                  onError: (e) => {
                    e.currentTarget.src = "https://via.placeholder.com/100x100?text=Error";
                  }
                }
              ),
              /* @__PURE__ */ jsxs("div", { className: "flex-1", children: [
                /* @__PURE__ */ jsx("p", { className: "font-medium text-gray-800 mb-1", children: item.filename }),
                /* @__PURE__ */ jsxs("p", { className: "text-xs text-gray-500", children: [
                  formatFileSize(item.size),
                  " • ",
                  new Date(item.created_at).toLocaleDateString("fr-FR")
                ] })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "flex gap-2", children: [
                /* @__PURE__ */ jsxs(
                  "button",
                  {
                    onClick: (e) => {
                      e.stopPropagation();
                      copyToClipboard(item.url);
                    },
                    className: "flex items-center gap-2 px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition text-sm",
                    children: [
                      /* @__PURE__ */ jsx(Copy, { size: 16 }),
                      "Copier"
                    ]
                  }
                ),
                /* @__PURE__ */ jsx(
                  "a",
                  {
                    href: item.url,
                    target: "_blank",
                    rel: "noopener noreferrer",
                    onClick: (e) => e.stopPropagation(),
                    className: "p-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition",
                    children: /* @__PURE__ */ jsx(ExternalLink, { size: 16 })
                  }
                ),
                /* @__PURE__ */ jsx(
                  "button",
                  {
                    onClick: (e) => {
                      e.stopPropagation();
                      deleteMedia(item.id);
                    },
                    className: "p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition",
                    children: /* @__PURE__ */ jsx(Trash2, { size: 16 })
                  }
                )
              ] })
            ]
          },
          item.id
        )) }),
        /* @__PURE__ */ jsx(
          Pagination,
          {
            currentPage,
            totalPages,
            onPageChange: setCurrentPage,
            itemsPerPage,
            totalItems: filteredMedia.length
          }
        )
      ] })
    ] })
  ] });
}
function Analytics() {
  const [stats, setStats] = useState({
    totalReservations: 0,
    totalContacts: 0,
    reservationsThisMonth: 0,
    reservationsLastMonth: 0,
    pendingReservations: 0,
    confirmedReservations: 0
  });
  const [recentActivity, setRecentActivity] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetchAnalytics();
  }, []);
  const fetchAnalytics = async () => {
    setLoading(true);
    const now = /* @__PURE__ */ new Date();
    const firstDayThisMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const firstDayLastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
    const lastDayLastMonth = new Date(now.getFullYear(), now.getMonth(), 0);
    const [
      reservationsTotal,
      contactsTotal,
      reservationsThisMonth,
      reservationsLastMonth,
      pendingCount,
      confirmedCount,
      recentRes
    ] = await Promise.all([
      supabase.from("reservations").select("*", { count: "exact", head: true }),
      supabase.from("contacts").select("*", { count: "exact", head: true }),
      supabase.from("reservations").select("*", { count: "exact", head: true }).gte("created_at", firstDayThisMonth.toISOString()),
      supabase.from("reservations").select("*", { count: "exact", head: true }).gte("created_at", firstDayLastMonth.toISOString()).lte("created_at", lastDayLastMonth.toISOString()),
      supabase.from("reservations").select("*", { count: "exact", head: true }).eq("statut", "pending"),
      supabase.from("reservations").select("*", { count: "exact", head: true }).eq("statut", "confirmed"),
      supabase.from("reservations").select("nom, prenom, adresse_depart, adresse_arrivee, date_rdv, created_at").order("created_at", { ascending: false }).limit(10)
    ]);
    setStats({
      totalReservations: reservationsTotal.count || 0,
      totalContacts: contactsTotal.count || 0,
      reservationsThisMonth: reservationsThisMonth.count || 0,
      reservationsLastMonth: reservationsLastMonth.count || 0,
      pendingReservations: pendingCount.count || 0,
      confirmedReservations: confirmedCount.count || 0
    });
    setRecentActivity(recentRes.data || []);
    setLoading(false);
  };
  const calculateGrowth = () => {
    if (stats.reservationsLastMonth === 0) return 0;
    const growth2 = (stats.reservationsThisMonth - stats.reservationsLastMonth) / stats.reservationsLastMonth * 100;
    return Math.round(growth2);
  };
  const growth = calculateGrowth();
  const statCards = [
    {
      icon: Calendar,
      label: "Réservations totales",
      value: stats.totalReservations,
      subtext: "Depuis le début",
      color: "bg-blue-500",
      bgColor: "bg-blue-100",
      textColor: "text-blue-600"
    },
    {
      icon: TrendingUp,
      label: "Réservations ce mois",
      value: stats.reservationsThisMonth,
      subtext: `${growth >= 0 ? "+" : ""}${growth}% vs mois dernier`,
      color: "bg-green-500",
      bgColor: "bg-green-100",
      textColor: "text-green-600",
      growth
    },
    {
      icon: Clock,
      label: "En attente",
      value: stats.pendingReservations,
      subtext: "À traiter",
      color: "bg-orange-500",
      bgColor: "bg-orange-100",
      textColor: "text-orange-600"
    },
    {
      icon: Users,
      label: "Messages reçus",
      value: stats.totalContacts,
      subtext: "Formulaire de contact",
      color: "bg-purple-500",
      bgColor: "bg-purple-100",
      textColor: "text-purple-600"
    }
  ];
  if (loading) {
    return /* @__PURE__ */ jsx(AdminLayout, { children: /* @__PURE__ */ jsx("div", { className: "flex items-center justify-center h-64", children: /* @__PURE__ */ jsx("div", { className: "animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600" }) }) });
  }
  return /* @__PURE__ */ jsx(AdminLayout, { children: /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsxs("div", { className: "mb-8", children: [
      /* @__PURE__ */ jsx("h1", { className: "text-3xl font-bold text-gray-800 mb-2", children: "Analytics" }),
      /* @__PURE__ */ jsx("p", { className: "text-gray-600", children: "Statistiques et analyse de votre activite" })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-xl shadow-lg p-6 mb-8 border border-gray-200", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between mb-5", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ jsx("div", { className: "p-2.5 bg-amber-50 rounded-lg", children: /* @__PURE__ */ jsx(BarChart3, { size: 22, className: "text-amber-600" }) }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("h2", { className: "text-lg font-bold text-gray-800", children: "Google Analytics" }),
            /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-500", children: "ID : G-3780TKJD8H" })
          ] })
        ] }),
        /* @__PURE__ */ jsxs(
          "a",
          {
            href: "https://analytics.google.com/analytics/web/#/p/G-3780TKJD8H",
            target: "_blank",
            rel: "noopener noreferrer",
            className: "inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition",
            children: [
              /* @__PURE__ */ jsx(ExternalLink, { size: 14 }),
              "Ouvrir Google Analytics"
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-4 mb-5", children: [
        /* @__PURE__ */ jsxs("div", { className: "bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-4 border border-blue-200", children: [
          /* @__PURE__ */ jsx("p", { className: "text-xs text-blue-600 font-medium mb-1", children: "Statut" }),
          /* @__PURE__ */ jsx("p", { className: "text-lg font-bold text-blue-800", children: "Actif" }),
          /* @__PURE__ */ jsx("p", { className: "text-xs text-blue-500 mt-1", children: "Collecte de donnees en cours" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-4 border border-green-200", children: [
          /* @__PURE__ */ jsx("p", { className: "text-xs text-green-600 font-medium mb-1", children: "Suivi des pages" }),
          /* @__PURE__ */ jsx("p", { className: "text-lg font-bold text-green-800", children: "Toutes les pages" }),
          /* @__PURE__ */ jsx("p", { className: "text-xs text-green-500 mt-1", children: "Navigation SPA incluse" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "bg-gradient-to-br from-amber-50 to-amber-100 rounded-xl p-4 border border-amber-200", children: [
          /* @__PURE__ */ jsx("p", { className: "text-xs text-amber-600 font-medium mb-1", children: "Compte" }),
          /* @__PURE__ */ jsx("p", { className: "text-lg font-bold text-amber-800", children: "kertous.r@gmail.com" }),
          /* @__PURE__ */ jsx("p", { className: "text-xs text-amber-500 mt-1", children: "Proprietaire du compte GA" })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "bg-gray-50 rounded-xl p-4 border border-gray-200", children: [
        /* @__PURE__ */ jsx("h3", { className: "text-sm font-semibold text-gray-700 mb-3", children: "Donnees collectees" }),
        /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 md:grid-cols-4 gap-3", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 text-sm text-gray-600", children: [
            /* @__PURE__ */ jsx("span", { className: "w-2 h-2 bg-green-500 rounded-full" }),
            "Pages vues"
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 text-sm text-gray-600", children: [
            /* @__PURE__ */ jsx("span", { className: "w-2 h-2 bg-green-500 rounded-full" }),
            "Sessions"
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 text-sm text-gray-600", children: [
            /* @__PURE__ */ jsx("span", { className: "w-2 h-2 bg-green-500 rounded-full" }),
            "Utilisateurs"
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 text-sm text-gray-600", children: [
            /* @__PURE__ */ jsx("span", { className: "w-2 h-2 bg-green-500 rounded-full" }),
            "Taux de rebond"
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 text-sm text-gray-600", children: [
            /* @__PURE__ */ jsx("span", { className: "w-2 h-2 bg-green-500 rounded-full" }),
            "Sources de trafic"
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 text-sm text-gray-600", children: [
            /* @__PURE__ */ jsx("span", { className: "w-2 h-2 bg-green-500 rounded-full" }),
            "Geolocalisation"
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 text-sm text-gray-600", children: [
            /* @__PURE__ */ jsx("span", { className: "w-2 h-2 bg-green-500 rounded-full" }),
            "Appareils"
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 text-sm text-gray-600", children: [
            /* @__PURE__ */ jsx("span", { className: "w-2 h-2 bg-green-500 rounded-full" }),
            "Conversions"
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8", children: statCards.map((stat) => {
      const Icon = stat.icon;
      return /* @__PURE__ */ jsxs(
        "div",
        {
          className: `bg-white rounded-xl shadow-lg p-6 border-l-4 ${stat.color} hover:shadow-xl transition-shadow`,
          children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between mb-4", children: [
              /* @__PURE__ */ jsx("div", { className: `p-3 ${stat.bgColor} rounded-lg`, children: /* @__PURE__ */ jsx(Icon, { className: stat.textColor, size: 28 }) }),
              stat.growth !== void 0 && /* @__PURE__ */ jsxs(
                "div",
                {
                  className: `flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${stat.growth >= 0 ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`,
                  children: [
                    stat.growth >= 0 ? /* @__PURE__ */ jsx(ArrowUp, { size: 14 }) : /* @__PURE__ */ jsx(ArrowDown, { size: 14 }),
                    Math.abs(stat.growth),
                    "%"
                  ]
                }
              )
            ] }),
            /* @__PURE__ */ jsx("p", { className: "text-gray-600 text-sm font-medium mb-1", children: stat.label }),
            /* @__PURE__ */ jsx("p", { className: "text-3xl font-bold text-gray-800 mb-1", children: stat.value }),
            /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-500", children: stat.subtext })
          ]
        },
        stat.label
      );
    }) }),
    /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8", children: [
      /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-xl shadow-lg p-6", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-xl font-bold text-gray-800 mb-4", children: "Statistiques mensuelles" }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center p-4 bg-gray-50 rounded-lg", children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-600", children: "Mois en cours" }),
              /* @__PURE__ */ jsx("p", { className: "text-2xl font-bold text-gray-800", children: stats.reservationsThisMonth })
            ] }),
            /* @__PURE__ */ jsx(Calendar, { className: "text-blue-500", size: 32 })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center p-4 bg-gray-50 rounded-lg", children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-600", children: "Mois dernier" }),
              /* @__PURE__ */ jsx("p", { className: "text-2xl font-bold text-gray-800", children: stats.reservationsLastMonth })
            ] }),
            /* @__PURE__ */ jsx(Calendar, { className: "text-gray-400", size: 32 })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-xl shadow-lg p-6", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-xl font-bold text-gray-800 mb-4", children: "Statuts des réservations" }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center p-4 bg-green-50 rounded-lg", children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("p", { className: "text-sm text-green-800 font-medium", children: "Confirmées" }),
              /* @__PURE__ */ jsx("p", { className: "text-2xl font-bold text-green-900", children: stats.confirmedReservations })
            ] }),
            /* @__PURE__ */ jsx("div", { className: "h-12 w-12 rounded-full bg-green-200 flex items-center justify-center", children: /* @__PURE__ */ jsx(Eye, { className: "text-green-700", size: 24 }) })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center p-4 bg-orange-50 rounded-lg", children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("p", { className: "text-sm text-orange-800 font-medium", children: "En attente" }),
              /* @__PURE__ */ jsx("p", { className: "text-2xl font-bold text-orange-900", children: stats.pendingReservations })
            ] }),
            /* @__PURE__ */ jsx("div", { className: "h-12 w-12 rounded-full bg-orange-200 flex items-center justify-center", children: /* @__PURE__ */ jsx(Clock, { className: "text-orange-700", size: 24 }) })
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-xl shadow-lg p-6", children: [
      /* @__PURE__ */ jsxs("h2", { className: "text-xl font-bold text-gray-800 mb-4 flex items-center gap-2", children: [
        /* @__PURE__ */ jsx(MapPin, { size: 24 }),
        "Activité récente"
      ] }),
      /* @__PURE__ */ jsx("div", { className: "space-y-3", children: recentActivity.length === 0 ? /* @__PURE__ */ jsx("p", { className: "text-gray-500 text-center py-8", children: "Aucune activité récente" }) : recentActivity.map((item, index) => /* @__PURE__ */ jsxs(
        "div",
        {
          className: "flex items-start gap-4 p-4 hover:bg-gray-50 rounded-lg transition border border-gray-100",
          children: [
            /* @__PURE__ */ jsx("div", { className: "flex-shrink-0 h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center", children: /* @__PURE__ */ jsx(Calendar, { className: "text-blue-600", size: 20 }) }),
            /* @__PURE__ */ jsxs("div", { className: "flex-1 min-w-0", children: [
              /* @__PURE__ */ jsxs("p", { className: "font-medium text-gray-800", children: [
                item.nom,
                " ",
                item.prenom
              ] }),
              /* @__PURE__ */ jsxs("p", { className: "text-sm text-gray-600 truncate", children: [
                item.adresse_depart,
                " → ",
                item.adresse_arrivee
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4 mt-1", children: [
                /* @__PURE__ */ jsxs("p", { className: "text-xs text-gray-500", children: [
                  "RDV: ",
                  new Date(item.date_rdv).toLocaleDateString("fr-FR")
                ] }),
                /* @__PURE__ */ jsxs("p", { className: "text-xs text-gray-400", children: [
                  "Créé: ",
                  new Date(item.created_at).toLocaleDateString("fr-FR")
                ] })
              ] })
            ] })
          ]
        },
        index
      )) })
    ] })
  ] }) });
}
function LogoSettings() {
  const [logoUrl, setLogoUrl] = useState("");
  const [homeLogoUrl, setHomeLogoUrl] = useState("");
  const [initialLogoUrl, setInitialLogoUrl] = useState("");
  const [initialHomeLogoUrl, setInitialHomeLogoUrl] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [showMediaPicker, setShowMediaPicker] = useState(false);
  const [showHomeMediaPicker, setShowHomeMediaPicker] = useState(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  useEffect(() => {
    fetchLogo();
  }, []);
  useEffect(() => {
    setHasUnsavedChanges(
      logoUrl !== initialLogoUrl || homeLogoUrl !== initialHomeLogoUrl
    );
  }, [logoUrl, homeLogoUrl, initialLogoUrl, initialHomeLogoUrl]);
  const fetchLogo = async () => {
    try {
      const { data: logos, error } = await supabase.from("site_settings").select("key, value").in("key", ["site_logo", "home_logo"]);
      if (error) throw error;
      logos == null ? void 0 : logos.forEach((item) => {
        if (item.key === "site_logo") {
          setLogoUrl(item.value || "");
          setInitialLogoUrl(item.value || "");
        } else if (item.key === "home_logo") {
          setHomeLogoUrl(item.value || "");
          setInitialHomeLogoUrl(item.value || "");
        }
      });
    } catch (error) {
      console.error("Erreur lors du chargement des logos:", error);
    } finally {
      setLoading(false);
    }
  };
  const handleSave = async () => {
    setSaving(true);
    try {
      console.log("Sauvegarde des logos:", { logoUrl, homeLogoUrl });
      const settingsToUpdate = [
        { key: "site_logo", value: logoUrl, description: "URL du logo du site" },
        { key: "home_logo", value: homeLogoUrl, description: "URL du logo de la page d'accueil" }
      ];
      for (const setting of settingsToUpdate) {
        const { data: existing } = await supabase.from("site_settings").select("id").eq("key", setting.key).maybeSingle();
        console.log(`Setting ${setting.key}:`, { existing, value: setting.value });
        if (existing) {
          const { error } = await supabase.from("site_settings").update({
            value: setting.value,
            updated_at: (/* @__PURE__ */ new Date()).toISOString()
          }).eq("key", setting.key);
          if (error) {
            console.error(`Erreur update ${setting.key}:`, error);
            throw error;
          }
          console.log(`${setting.key} mis à jour avec succès`);
        } else {
          const { error } = await supabase.from("site_settings").insert({
            key: setting.key,
            value: setting.value,
            description: setting.description
          });
          if (error) {
            console.error(`Erreur insert ${setting.key}:`, error);
            throw error;
          }
          console.log(`${setting.key} inséré avec succès`);
        }
      }
      setInitialLogoUrl(logoUrl);
      setInitialHomeLogoUrl(homeLogoUrl);
      setHasUnsavedChanges(false);
      alert("Logos enregistrés avec succès ! Rechargez la page d'accueil pour voir les changements.");
      console.log("Sauvegarde terminée avec succès");
    } catch (error) {
      console.error("Erreur lors de la sauvegarde:", error);
      alert("Erreur lors de la sauvegarde des logos: " + error.message);
    } finally {
      setSaving(false);
    }
  };
  const handleMediaSelect = (url) => {
    setLogoUrl(url);
    setShowMediaPicker(false);
  };
  const handleHomeMediaSelect = (url) => {
    setHomeLogoUrl(url);
    setShowHomeMediaPicker(false);
  };
  if (loading) {
    return /* @__PURE__ */ jsx("div", { className: "flex justify-center items-center h-64", children: /* @__PURE__ */ jsx("div", { className: "animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600" }) });
  }
  return /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx("h1", { className: "text-2xl font-bold text-gray-800", children: "Paramètres des Logos" }),
      /* @__PURE__ */ jsx("p", { className: "text-gray-600 mt-1", children: "Gérez les logos du site (en-tête et page d'accueil)" })
    ] }),
    hasUnsavedChanges && /* @__PURE__ */ jsx("div", { className: "bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center", children: [
      /* @__PURE__ */ jsx("div", { className: "flex-shrink-0", children: /* @__PURE__ */ jsx("svg", { className: "h-5 w-5 text-yellow-400", viewBox: "0 0 20 20", fill: "currentColor", children: /* @__PURE__ */ jsx("path", { fillRule: "evenodd", d: "M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z", clipRule: "evenodd" }) }) }),
      /* @__PURE__ */ jsx("div", { className: "ml-3", children: /* @__PURE__ */ jsx("p", { className: "text-sm text-yellow-700 font-medium", children: `⚠️ Vous avez des modifications non enregistrées. N'oubliez pas de cliquer sur "Enregistrer" en bas de la page !` }) })
    ] }) }),
    /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-lg shadow-md p-6 space-y-6", children: [
      /* @__PURE__ */ jsxs("div", { className: "border-b pb-6", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-lg font-semibold text-gray-800 mb-4", children: "Logo de l'en-tête" }),
        /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700 mb-2", children: "URL du logo" }),
        /* @__PURE__ */ jsxs("div", { className: "flex gap-2", children: [
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "text",
              value: logoUrl,
              onChange: (e) => setLogoUrl(e.target.value),
              className: "flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500",
              placeholder: "https://exemple.com/logo-header.png"
            }
          ),
          /* @__PURE__ */ jsxs(
            "button",
            {
              onClick: () => setShowMediaPicker(true),
              className: "flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200",
              children: [
                /* @__PURE__ */ jsx(Upload, { size: 20 }),
                "Choisir"
              ]
            }
          ),
          logoUrl && /* @__PURE__ */ jsxs(
            "button",
            {
              onClick: () => setLogoUrl(""),
              className: "flex items-center gap-2 px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200",
              title: "Supprimer le logo",
              children: [
                /* @__PURE__ */ jsx(Trash2, { size: 20 }),
                "Supprimer"
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-500 mt-1", children: "Ce logo s'affiche dans l'en-tête du site. Si vide, le badge VSL par défaut sera affiché." })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "bg-green-50 border border-green-200 rounded-lg p-3", children: /* @__PURE__ */ jsxs("p", { className: "text-xs text-green-800", children: [
        /* @__PURE__ */ jsx("strong", { children: "💡 Conseil :" }),
        " Hauteur 40-60px, format horizontal, PNG transparent recommandé"
      ] }) }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700 mb-2", children: "Prévisualisation (En-tête)" }),
        /* @__PURE__ */ jsxs("div", { className: "border-2 border-dashed border-gray-300 rounded-lg p-8 flex items-center justify-center bg-gray-50", children: [
          logoUrl ? /* @__PURE__ */ jsx(
            "img",
            {
              src: logoUrl,
              alt: "Logo du site",
              className: "max-h-32 max-w-full object-contain",
              onError: (e) => {
                e.currentTarget.style.display = "none";
                const fallback = e.currentTarget.nextElementSibling;
                if (fallback) fallback.style.display = "flex";
              }
            }
          ) : /* @__PURE__ */ jsxs("div", { className: "text-center text-gray-400", children: [
            /* @__PURE__ */ jsx(Image$1, { size: 48, className: "mx-auto mb-2" }),
            /* @__PURE__ */ jsx("p", { children: "Logo par défaut (Badge VSL)" })
          ] }),
          /* @__PURE__ */ jsxs(
            "div",
            {
              className: "hidden flex-col items-center text-gray-400",
              children: [
                /* @__PURE__ */ jsx(Image$1, { size: 48, className: "mb-2" }),
                /* @__PURE__ */ jsx("p", { children: "Erreur de chargement du logo" })
              ]
            }
          )
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-lg shadow-md p-6 space-y-6", children: [
      /* @__PURE__ */ jsxs("div", { className: "border-b pb-6", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-lg font-semibold text-gray-800 mb-4", children: "Logo de la page d'accueil" }),
        /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700 mb-2", children: "URL du logo" }),
        /* @__PURE__ */ jsxs("div", { className: "flex gap-2", children: [
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "text",
              value: homeLogoUrl,
              onChange: (e) => setHomeLogoUrl(e.target.value),
              className: "flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500",
              placeholder: "https://exemple.com/logo-accueil.png"
            }
          ),
          /* @__PURE__ */ jsxs(
            "button",
            {
              onClick: () => setShowHomeMediaPicker(true),
              className: "flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200",
              children: [
                /* @__PURE__ */ jsx(Upload, { size: 20 }),
                "Choisir"
              ]
            }
          ),
          homeLogoUrl && /* @__PURE__ */ jsxs(
            "button",
            {
              onClick: () => setHomeLogoUrl(""),
              className: "flex items-center gap-2 px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200",
              title: "Supprimer le logo",
              children: [
                /* @__PURE__ */ jsx(Trash2, { size: 20 }),
                "Supprimer"
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-500 mt-1", children: `Ce logo remplace "VSL" dans le titre de la page d'accueil. Si vide, le texte "VSL" sera affiché.` })
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700 mb-2", children: "Prévisualisation (Page d'accueil)" }),
        /* @__PURE__ */ jsxs("div", { className: "border-2 border-dashed border-gray-300 rounded-lg p-8 flex items-center justify-center bg-gray-50", children: [
          homeLogoUrl ? /* @__PURE__ */ jsx(
            "img",
            {
              src: homeLogoUrl,
              alt: "Logo de la page d'accueil",
              className: "max-h-32 max-w-full object-contain",
              onError: (e) => {
                e.currentTarget.style.display = "none";
                const fallback = e.currentTarget.nextElementSibling;
                if (fallback) fallback.style.display = "flex";
              }
            }
          ) : /* @__PURE__ */ jsxs("div", { className: "text-center text-gray-400", children: [
            /* @__PURE__ */ jsx(Image$1, { size: 48, className: "mx-auto mb-2" }),
            /* @__PURE__ */ jsx("p", { children: 'Texte "VSL" par défaut' })
          ] }),
          /* @__PURE__ */ jsxs(
            "div",
            {
              className: "hidden flex-col items-center text-gray-400",
              children: [
                /* @__PURE__ */ jsx(Image$1, { size: 48, className: "mb-2" }),
                /* @__PURE__ */ jsx("p", { children: "Erreur de chargement du logo" })
              ]
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "bg-blue-50 border border-blue-200 rounded-lg p-4", children: [
        /* @__PURE__ */ jsxs("h3", { className: "font-semibold text-blue-900 mb-2 flex items-center gap-2", children: [
          /* @__PURE__ */ jsx("svg", { className: "h-5 w-5", fill: "currentColor", viewBox: "0 0 20 20", children: /* @__PURE__ */ jsx("path", { fillRule: "evenodd", d: "M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z", clipRule: "evenodd" }) }),
          "Format requis pour le logo d'accueil"
        ] }),
        /* @__PURE__ */ jsxs("ul", { className: "text-sm text-blue-800 space-y-2 ml-7", children: [
          /* @__PURE__ */ jsxs("li", { className: "flex items-start gap-2", children: [
            /* @__PURE__ */ jsx("span", { className: "font-bold", children: "✓" }),
            /* @__PURE__ */ jsxs("span", { children: [
              /* @__PURE__ */ jsx("strong", { children: "Format :" }),
              " PNG avec fond transparent (recommandé) ou JPG"
            ] })
          ] }),
          /* @__PURE__ */ jsxs("li", { className: "flex items-start gap-2", children: [
            /* @__PURE__ */ jsx("span", { className: "font-bold", children: "✓" }),
            /* @__PURE__ */ jsxs("span", { children: [
              /* @__PURE__ */ jsx("strong", { children: "Dimensions :" }),
              " Hauteur entre 60-100px, largeur proportionnelle"
            ] })
          ] }),
          /* @__PURE__ */ jsxs("li", { className: "flex items-start gap-2", children: [
            /* @__PURE__ */ jsx("span", { className: "font-bold", children: "✓" }),
            /* @__PURE__ */ jsxs("span", { children: [
              /* @__PURE__ */ jsx("strong", { children: "Ratio :" }),
              " Format horizontal ou carré (évitez les formats trop verticaux)"
            ] })
          ] }),
          /* @__PURE__ */ jsxs("li", { className: "flex items-start gap-2", children: [
            /* @__PURE__ */ jsx("span", { className: "font-bold", children: "✓" }),
            /* @__PURE__ */ jsxs("span", { children: [
              /* @__PURE__ */ jsx("strong", { children: "Taille :" }),
              " Moins de 500 KB pour un chargement rapide"
            ] })
          ] }),
          /* @__PURE__ */ jsxs("li", { className: "flex items-start gap-2 pt-2 border-t border-blue-200 mt-2", children: [
            /* @__PURE__ */ jsx("span", { className: "text-blue-600", children: "ℹ️" }),
            /* @__PURE__ */ jsx("span", { className: "text-blue-700 font-medium", children: 'Le logo remplacera "VSL" dans le titre : "Taxi [VOTRE LOGO] Conventionné CPAM"' })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "flex justify-end", children: /* @__PURE__ */ jsxs(
        "button",
        {
          onClick: handleSave,
          disabled: saving || !hasUnsavedChanges,
          className: `flex items-center gap-2 px-8 py-3 rounded-lg font-semibold transition-all ${hasUnsavedChanges ? "bg-green-600 text-white hover:bg-green-700 shadow-lg animate-pulse" : "bg-gray-300 text-gray-500 cursor-not-allowed"} ${saving ? "opacity-50" : ""}`,
          children: [
            /* @__PURE__ */ jsx(Save, { size: 20 }),
            saving ? "Enregistrement..." : hasUnsavedChanges ? "💾 Enregistrer les modifications" : "Aucune modification"
          ]
        }
      ) })
    ] }),
    showMediaPicker && /* @__PURE__ */ jsx(
      MediaPicker,
      {
        onSelect: handleMediaSelect,
        onClose: () => setShowMediaPicker(false),
        logoMode: true
      }
    ),
    showHomeMediaPicker && /* @__PURE__ */ jsx(
      MediaPicker,
      {
        onSelect: handleHomeMediaSelect,
        onClose: () => setShowHomeMediaPicker(false),
        logoMode: true
      }
    )
  ] });
}
function DepartmentGallery() {
  const [departments2, setDepartments] = useState([]);
  const [selectedDept, setSelectedDept] = useState("");
  const [gallery, setGallery] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [showMediaPicker, setShowMediaPicker] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);
  useEffect(() => {
    fetchDepartments();
  }, []);
  useEffect(() => {
    if (selectedDept) {
      loadGallery(selectedDept);
    }
  }, [selectedDept]);
  const fetchDepartments = async () => {
    try {
      const { data, error } = await supabase.from("pages").select("id, slug, title, gallery").in("slug", ["paris-75", "hauts-de-seine-92", "seine-saint-denis-93", "val-de-marne-94", "essonne-91"]).order("slug");
      if (error) throw error;
      setDepartments(data || []);
      if (data && data.length > 0) {
        setSelectedDept(data[0].id);
      }
    } catch (error) {
      console.error("Erreur lors du chargement des départements:", error);
      alert("Erreur lors du chargement des départements");
    } finally {
      setLoading(false);
    }
  };
  const loadGallery = (deptId) => {
    const dept = departments2.find((d) => d.id === deptId);
    if (dept) {
      setGallery(dept.gallery || []);
    }
  };
  const handleAddImage = () => {
    setEditingIndex(null);
    setShowMediaPicker(true);
  };
  const handleEditImage = (index) => {
    setEditingIndex(index);
    setShowMediaPicker(true);
  };
  const handleMediaSelect = (url) => {
    if (editingIndex !== null) {
      const newGallery = [...gallery];
      newGallery[editingIndex].url = url;
      setGallery(newGallery);
    } else {
      setGallery([...gallery, { url, alt: "", caption: "" }]);
    }
    setShowMediaPicker(false);
    setEditingIndex(null);
  };
  const handleUpdateImage = (index, field, value) => {
    const newGallery = [...gallery];
    newGallery[index][field] = value;
    setGallery(newGallery);
  };
  const handleRemoveImage = (index) => {
    if (confirm("Voulez-vous vraiment supprimer cette photo ?")) {
      setGallery(gallery.filter((_, i) => i !== index));
    }
  };
  const handleMoveUp = (index) => {
    if (index === 0) return;
    const newGallery = [...gallery];
    [newGallery[index - 1], newGallery[index]] = [newGallery[index], newGallery[index - 1]];
    setGallery(newGallery);
  };
  const handleMoveDown = (index) => {
    if (index === gallery.length - 1) return;
    const newGallery = [...gallery];
    [newGallery[index], newGallery[index + 1]] = [newGallery[index + 1], newGallery[index]];
    setGallery(newGallery);
  };
  const handleSave = async () => {
    if (!selectedDept) return;
    setSaving(true);
    try {
      const { error } = await supabase.from("pages").update({
        gallery,
        updated_at: (/* @__PURE__ */ new Date()).toISOString()
      }).eq("id", selectedDept);
      if (error) throw error;
      alert("Galerie enregistrée avec succès !");
      await fetchDepartments();
    } catch (error) {
      console.error("Erreur lors de la sauvegarde:", error);
      alert("Erreur lors de la sauvegarde de la galerie");
    } finally {
      setSaving(false);
    }
  };
  if (loading) {
    return /* @__PURE__ */ jsx("div", { className: "flex justify-center items-center h-64", children: /* @__PURE__ */ jsx("div", { className: "animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600" }) });
  }
  const currentDept = departments2.find((d) => d.id === selectedDept);
  return /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx("h1", { className: "text-2xl font-bold text-gray-800", children: "Galerie Photos des Départements" }),
      /* @__PURE__ */ jsx("p", { className: "text-gray-600 mt-1", children: "Ajoutez et gérez les photos qui s'affichent dans les pages de départements" })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-lg shadow-md p-6 space-y-6", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700 mb-2", children: "Département" }),
        /* @__PURE__ */ jsx(
          "select",
          {
            value: selectedDept,
            onChange: (e) => setSelectedDept(e.target.value),
            className: "w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500",
            children: departments2.map((dept) => /* @__PURE__ */ jsx("option", { value: dept.id, children: dept.title }, dept.id))
          }
        )
      ] }),
      currentDept && /* @__PURE__ */ jsxs(Fragment, { children: [
        /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center", children: [
          /* @__PURE__ */ jsxs("h2", { className: "text-lg font-semibold text-gray-800", children: [
            "Photos de ",
            currentDept.title
          ] }),
          /* @__PURE__ */ jsxs(
            "button",
            {
              onClick: handleAddImage,
              className: "flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700",
              children: [
                /* @__PURE__ */ jsx(Plus, { size: 20 }),
                "Ajouter une photo"
              ]
            }
          )
        ] }),
        gallery.length === 0 ? /* @__PURE__ */ jsxs("div", { className: "border-2 border-dashed border-gray-300 rounded-lg p-12 text-center", children: [
          /* @__PURE__ */ jsx(Image$1, { size: 48, className: "mx-auto mb-4 text-gray-400" }),
          /* @__PURE__ */ jsx("p", { className: "text-gray-500 mb-4", children: "Aucune photo dans la galerie" }),
          /* @__PURE__ */ jsx(
            "button",
            {
              onClick: handleAddImage,
              className: "px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700",
              children: "Ajouter la première photo"
            }
          )
        ] }) : /* @__PURE__ */ jsx("div", { className: "space-y-4", children: gallery.map((image, index) => /* @__PURE__ */ jsx("div", { className: "border border-gray-200 rounded-lg p-4", children: /* @__PURE__ */ jsxs("div", { className: "flex gap-4", children: [
          /* @__PURE__ */ jsx("div", { className: "flex-shrink-0", children: /* @__PURE__ */ jsx(
            "img",
            {
              src: image.url,
              alt: image.alt || "Photo",
              className: "w-32 h-32 object-cover rounded-lg",
              onError: (e) => {
                e.currentTarget.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="128" height="128"%3E%3Crect fill="%23ddd" width="128" height="128"/%3E%3Ctext fill="%23999" x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle"%3EErreur%3C/text%3E%3C/svg%3E';
              }
            }
          ) }),
          /* @__PURE__ */ jsxs("div", { className: "flex-1 space-y-3", children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("label", { className: "block text-xs font-medium text-gray-700 mb-1", children: "URL de l'image" }),
              /* @__PURE__ */ jsxs("div", { className: "flex gap-2", children: [
                /* @__PURE__ */ jsx(
                  "input",
                  {
                    type: "text",
                    value: image.url,
                    readOnly: true,
                    className: "flex-1 px-3 py-2 text-sm border border-gray-300 rounded-lg bg-gray-50"
                  }
                ),
                /* @__PURE__ */ jsx(
                  "button",
                  {
                    onClick: () => handleEditImage(index),
                    className: "px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200",
                    children: /* @__PURE__ */ jsx(Upload, { size: 16 })
                  }
                )
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("label", { className: "block text-xs font-medium text-gray-700 mb-1", children: "Texte alternatif (important pour le SEO)" }),
              /* @__PURE__ */ jsx(
                "input",
                {
                  type: "text",
                  value: image.alt,
                  onChange: (e) => handleUpdateImage(index, "alt", e.target.value),
                  placeholder: "Description de l'image",
                  className: "w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                }
              )
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("label", { className: "block text-xs font-medium text-gray-700 mb-1", children: "Légende (optionnelle)" }),
              /* @__PURE__ */ jsx(
                "input",
                {
                  type: "text",
                  value: image.caption,
                  onChange: (e) => handleUpdateImage(index, "caption", e.target.value),
                  placeholder: "Légende de la photo",
                  className: "w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-2", children: [
            /* @__PURE__ */ jsx(
              "button",
              {
                onClick: () => handleMoveUp(index),
                disabled: index === 0,
                className: "p-2 text-gray-600 hover:bg-gray-100 rounded disabled:opacity-30",
                title: "Monter",
                children: "↑"
              }
            ),
            /* @__PURE__ */ jsx(
              "button",
              {
                onClick: () => handleMoveDown(index),
                disabled: index === gallery.length - 1,
                className: "p-2 text-gray-600 hover:bg-gray-100 rounded disabled:opacity-30",
                title: "Descendre",
                children: "↓"
              }
            ),
            /* @__PURE__ */ jsx(
              "button",
              {
                onClick: () => handleRemoveImage(index),
                className: "p-2 text-red-600 hover:bg-red-50 rounded",
                title: "Supprimer",
                children: /* @__PURE__ */ jsx(Trash2, { size: 16 })
              }
            )
          ] })
        ] }) }, index)) }),
        /* @__PURE__ */ jsxs("div", { className: "bg-blue-50 border border-blue-200 rounded-lg p-4", children: [
          /* @__PURE__ */ jsx("h3", { className: "font-semibold text-blue-900 mb-2", children: "Conseils" }),
          /* @__PURE__ */ jsxs("ul", { className: "text-sm text-blue-800 space-y-1", children: [
            /* @__PURE__ */ jsx("li", { children: "• Ajoutez des photos représentatives du département ou des services" }),
            /* @__PURE__ */ jsx("li", { children: "• Le texte alternatif améliore le référencement (SEO)" }),
            /* @__PURE__ */ jsx("li", { children: "• Les photos s'afficheront dans l'ordre de la liste" }),
            /* @__PURE__ */ jsx("li", { children: "• Format recommandé : JPG ou PNG, largeur 800-1200px" })
          ] })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "flex justify-end", children: /* @__PURE__ */ jsxs(
          "button",
          {
            onClick: handleSave,
            disabled: saving,
            className: "flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed",
            children: [
              /* @__PURE__ */ jsx(Save, { size: 20 }),
              saving ? "Enregistrement..." : "Enregistrer la galerie"
            ]
          }
        ) })
      ] })
    ] }),
    showMediaPicker && /* @__PURE__ */ jsx(
      MediaPicker,
      {
        onSelect: handleMediaSelect,
        onClose: () => {
          setShowMediaPicker(false);
          setEditingIndex(null);
        }
      }
    )
  ] });
}
function FAQManager() {
  const [faqItems, setFaqItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [toast, setToast] = useState(null);
  const [formData, setFormData] = useState({
    question: "",
    answer: "",
    category: "Général",
    is_published: true
  });
  useEffect(() => {
    fetchFAQ();
  }, []);
  const fetchFAQ = async () => {
    try {
      const { data, error } = await supabase.from("faq").select("*").order("category", { ascending: true }).order("display_order", { ascending: true });
      if (error) throw error;
      setFaqItems(data || []);
    } catch (error) {
      console.error("Erreur:", error);
      showToast("Erreur lors du chargement de la FAQ", "error");
    } finally {
      setLoading(false);
    }
  };
  const showToast = (message, type) => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3e3);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        const { error } = await supabase.from("faq").update({
          ...formData,
          updated_at: (/* @__PURE__ */ new Date()).toISOString()
        }).eq("id", editingId);
        if (error) throw error;
        showToast("Question mise à jour avec succès", "success");
      } else {
        const maxOrder = Math.max(...faqItems.map((item) => item.display_order), 0);
        const { error } = await supabase.from("faq").insert([{
          ...formData,
          display_order: maxOrder + 1
        }]);
        if (error) throw error;
        showToast("Question ajoutée avec succès", "success");
      }
      resetForm();
      fetchFAQ();
    } catch (error) {
      console.error("Erreur:", error);
      showToast("Erreur lors de la sauvegarde", "error");
    }
  };
  const handleEdit = (item) => {
    setFormData({
      question: item.question,
      answer: item.answer,
      category: item.category,
      is_published: item.is_published
    });
    setEditingId(item.id);
    setShowForm(true);
  };
  const handleDelete = async (id) => {
    if (!confirm("Êtes-vous sûr de vouloir supprimer cette question ?")) return;
    try {
      const { error } = await supabase.from("faq").delete().eq("id", id);
      if (error) throw error;
      showToast("Question supprimée avec succès", "success");
      fetchFAQ();
    } catch (error) {
      console.error("Erreur:", error);
      showToast("Erreur lors de la suppression", "error");
    }
  };
  const togglePublish = async (id, currentStatus) => {
    try {
      const { error } = await supabase.from("faq").update({ is_published: !currentStatus }).eq("id", id);
      if (error) throw error;
      showToast(
        !currentStatus ? "Question publiée" : "Question dépubliée",
        "success"
      );
      fetchFAQ();
    } catch (error) {
      console.error("Erreur:", error);
      showToast("Erreur lors de la modification", "error");
    }
  };
  const moveItem = async (id, direction) => {
    const index = faqItems.findIndex((item) => item.id === id);
    if (index === -1) return;
    if (direction === "up" && index === 0) return;
    if (direction === "down" && index === faqItems.length - 1) return;
    const newIndex = direction === "up" ? index - 1 : index + 1;
    const item1 = faqItems[index];
    const item2 = faqItems[newIndex];
    try {
      const { error: error1 } = await supabase.from("faq").update({ display_order: item2.display_order }).eq("id", item1.id);
      const { error: error2 } = await supabase.from("faq").update({ display_order: item1.display_order }).eq("id", item2.id);
      if (error1 || error2) throw error1 || error2;
      fetchFAQ();
    } catch (error) {
      console.error("Erreur:", error);
      showToast("Erreur lors du déplacement", "error");
    }
  };
  const resetForm = () => {
    setFormData({
      question: "",
      answer: "",
      category: "Général",
      is_published: true
    });
    setEditingId(null);
    setShowForm(false);
  };
  const categories = Array.from(new Set(faqItems.map((item) => item.category)));
  return /* @__PURE__ */ jsxs(AdminLayout, { children: [
    /* @__PURE__ */ jsxs("div", { className: "max-w-6xl mx-auto", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center mb-8", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h1", { className: "text-3xl font-bold text-gray-900", children: "Gestion de la FAQ" }),
          /* @__PURE__ */ jsx("p", { className: "text-gray-600 mt-2", children: "Gérez les questions fréquentes affichées sur votre site" })
        ] }),
        /* @__PURE__ */ jsxs(
          "button",
          {
            onClick: () => setShowForm(!showForm),
            className: "flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition",
            children: [
              showForm ? /* @__PURE__ */ jsx(X, { size: 20 }) : /* @__PURE__ */ jsx(Plus, { size: 20 }),
              showForm ? "Annuler" : "Nouvelle Question"
            ]
          }
        )
      ] }),
      showForm && /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-lg shadow-md p-6 mb-8", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-xl font-bold text-gray-900 mb-4", children: editingId ? "Modifier la question" : "Nouvelle question" }),
        /* @__PURE__ */ jsxs("form", { onSubmit: handleSubmit, className: "space-y-4", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700 mb-2", children: "Catégorie" }),
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "text",
                value: formData.category,
                onChange: (e) => setFormData({ ...formData, category: e.target.value }),
                className: "w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent",
                placeholder: "Ex: Général, Tarifs, Réservation...",
                required: true
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700 mb-2", children: "Question" }),
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "text",
                value: formData.question,
                onChange: (e) => setFormData({ ...formData, question: e.target.value }),
                className: "w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent",
                placeholder: "Quelle est votre question ?",
                required: true
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700 mb-2", children: "Réponse" }),
            /* @__PURE__ */ jsx(
              "textarea",
              {
                value: formData.answer,
                onChange: (e) => setFormData({ ...formData, answer: e.target.value }),
                className: "w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent",
                rows: 6,
                placeholder: "La réponse à la question...",
                required: true
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "checkbox",
                id: "is_published",
                checked: formData.is_published,
                onChange: (e) => setFormData({ ...formData, is_published: e.target.checked }),
                className: "w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
              }
            ),
            /* @__PURE__ */ jsx("label", { htmlFor: "is_published", className: "text-sm font-medium text-gray-700", children: "Publier cette question" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex gap-3", children: [
            /* @__PURE__ */ jsxs(
              "button",
              {
                type: "submit",
                className: "flex items-center gap-2 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition",
                children: [
                  /* @__PURE__ */ jsx(Save, { size: 20 }),
                  editingId ? "Mettre à jour" : "Ajouter"
                ]
              }
            ),
            /* @__PURE__ */ jsx(
              "button",
              {
                type: "button",
                onClick: resetForm,
                className: "px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition",
                children: "Annuler"
              }
            )
          ] })
        ] })
      ] }),
      loading ? /* @__PURE__ */ jsx("div", { className: "flex justify-center py-12", children: /* @__PURE__ */ jsx("div", { className: "animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600" }) }) : faqItems.length === 0 ? /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-lg shadow-md p-12 text-center", children: [
        /* @__PURE__ */ jsx("p", { className: "text-gray-500 text-lg", children: "Aucune question pour le moment" }),
        /* @__PURE__ */ jsx("p", { className: "text-gray-400 mt-2", children: 'Cliquez sur "Nouvelle Question" pour commencer' })
      ] }) : /* @__PURE__ */ jsx("div", { className: "space-y-6", children: categories.map((category) => {
        const categoryItems = faqItems.filter((item) => item.category === category);
        return /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-lg shadow-md overflow-hidden", children: [
          /* @__PURE__ */ jsx("div", { className: "bg-gray-50 px-6 py-3 border-b", children: /* @__PURE__ */ jsx("h3", { className: "text-lg font-bold text-gray-900", children: category }) }),
          /* @__PURE__ */ jsx("div", { className: "divide-y", children: categoryItems.map((item, index) => /* @__PURE__ */ jsx("div", { className: "p-6 hover:bg-gray-50 transition", children: /* @__PURE__ */ jsxs("div", { className: "flex items-start justify-between gap-4", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex-1", children: [
              /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 mb-2", children: [
                !item.is_published && /* @__PURE__ */ jsx("span", { className: "px-2 py-1 bg-gray-200 text-gray-600 text-xs font-semibold rounded", children: "Non publié" }),
                /* @__PURE__ */ jsx("h4", { className: "text-lg font-semibold text-gray-900", children: item.question })
              ] }),
              /* @__PURE__ */ jsx("p", { className: "text-gray-700 whitespace-pre-wrap", children: item.answer })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex gap-2", children: [
              /* @__PURE__ */ jsx(
                "button",
                {
                  onClick: () => moveItem(item.id, "up"),
                  disabled: index === 0,
                  className: "p-2 text-gray-600 hover:bg-gray-100 rounded disabled:opacity-30",
                  title: "Monter",
                  children: /* @__PURE__ */ jsx(ArrowUp, { size: 18 })
                }
              ),
              /* @__PURE__ */ jsx(
                "button",
                {
                  onClick: () => moveItem(item.id, "down"),
                  disabled: index === categoryItems.length - 1,
                  className: "p-2 text-gray-600 hover:bg-gray-100 rounded disabled:opacity-30",
                  title: "Descendre",
                  children: /* @__PURE__ */ jsx(ArrowDown, { size: 18 })
                }
              ),
              /* @__PURE__ */ jsx(
                "button",
                {
                  onClick: () => togglePublish(item.id, item.is_published),
                  className: "p-2 text-blue-600 hover:bg-blue-50 rounded",
                  title: item.is_published ? "Dépublier" : "Publier",
                  children: item.is_published ? /* @__PURE__ */ jsx(Eye, { size: 18 }) : /* @__PURE__ */ jsx(EyeOff, { size: 18 })
                }
              ),
              /* @__PURE__ */ jsx(
                "button",
                {
                  onClick: () => handleEdit(item),
                  className: "p-2 text-blue-600 hover:bg-blue-50 rounded",
                  title: "Modifier",
                  children: /* @__PURE__ */ jsx(Edit2, { size: 18 })
                }
              ),
              /* @__PURE__ */ jsx(
                "button",
                {
                  onClick: () => handleDelete(item.id),
                  className: "p-2 text-red-600 hover:bg-red-50 rounded",
                  title: "Supprimer",
                  children: /* @__PURE__ */ jsx(Trash2, { size: 18 })
                }
              )
            ] })
          ] }) }, item.id)) })
        ] }, category);
      }) })
    ] }),
    toast && /* @__PURE__ */ jsx(
      Toast,
      {
        message: toast.message,
        type: toast.type,
        onClose: () => setToast(null)
      }
    )
  ] });
}
function FAQ() {
  const [faqItems, setFaqItems] = useState({});
  const [openItems, setOpenItems] = useState({});
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetchFAQ();
  }, []);
  const fetchFAQ = async () => {
    try {
      const { data, error } = await supabase.from("faq").select("*").eq("is_published", true).order("display_order", { ascending: true });
      if (error) throw error;
      const groupedFAQ = {};
      data == null ? void 0 : data.forEach((item) => {
        const category = item.category || "Général";
        if (!groupedFAQ[category]) {
          groupedFAQ[category] = [];
        }
        groupedFAQ[category].push(item);
      });
      setFaqItems(groupedFAQ);
    } catch (error) {
      console.error("Erreur lors du chargement de la FAQ:", error);
    } finally {
      setLoading(false);
    }
  };
  const toggleItem = (id) => {
    setOpenItems((prev) => ({
      ...prev,
      [id]: !prev[id]
    }));
  };
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": Object.values(faqItems).flat().map((item) => ({
      "@type": "Question",
      "name": item.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": item.answer
      }
    }))
  };
  if (loading) {
    return /* @__PURE__ */ jsx("div", { className: "min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-blue-50", children: /* @__PURE__ */ jsxs("div", { className: "text-center", children: [
      /* @__PURE__ */ jsx("div", { className: "inline-block animate-spin rounded-full h-16 w-16 border-4 border-blue-600 border-t-transparent" }),
      /* @__PURE__ */ jsx("p", { className: "mt-4 text-slate-600 font-medium", children: "Chargement..." })
    ] }) });
  }
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(
      SEOHead,
      {
        title: "Questions Fréquentes - Taxi Conventionné Paris",
        description: "Retrouvez toutes les réponses à vos questions sur nos services de taxi conventionné et VSL en Île-de-France. Transport médical, tarifs, réservation et plus.",
        keywords: "faq taxi conventionné, questions taxi, transport médical paris, remboursement sécurité sociale",
        canonical: "https://www.taxisparis-conventionnes.fr/faq",
        jsonLD: schemaData
      }
    ),
    /* @__PURE__ */ jsxs("div", { className: "min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50", children: [
      /* @__PURE__ */ jsxs("div", { className: "relative overflow-hidden bg-gradient-to-r from-blue-600 via-blue-700 to-cyan-600 text-white", children: [
        /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-black opacity-10" }),
        /* @__PURE__ */ jsx("div", { className: "absolute inset-0", style: {
          backgroundImage: "radial-gradient(circle at 20% 50%, rgba(255, 255, 255, 0.1) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(255, 255, 255, 0.1) 0%, transparent 50%)"
        } }),
        /* @__PURE__ */ jsx("div", { className: "relative max-w-7xl mx-auto px-4 py-20 sm:px-6 lg:px-8", children: /* @__PURE__ */ jsxs("div", { className: "text-center", children: [
          /* @__PURE__ */ jsx("div", { className: "inline-flex items-center justify-center w-16 h-16 bg-white/10 backdrop-blur-sm rounded-2xl mb-6", children: /* @__PURE__ */ jsx(HelpCircle, { className: "w-8 h-8" }) }),
          /* @__PURE__ */ jsx("h1", { className: "text-5xl font-bold mb-6 tracking-tight", children: "Questions Fréquentes" }),
          /* @__PURE__ */ jsx("p", { className: "text-xl text-blue-100 max-w-3xl mx-auto leading-relaxed", children: "Trouvez rapidement toutes les réponses à vos questions sur nos services de taxi conventionné et VSL en Île-de-France" })
        ] }) }),
        /* @__PURE__ */ jsx("div", { className: "absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-slate-50 to-transparent" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "max-w-5xl mx-auto px-4 py-16 sm:px-6 lg:px-8", children: [
        Object.keys(faqItems).length === 0 ? /* @__PURE__ */ jsxs("div", { className: "text-center py-20", children: [
          /* @__PURE__ */ jsx("div", { className: "inline-flex items-center justify-center w-20 h-20 bg-slate-100 rounded-full mb-6", children: /* @__PURE__ */ jsx(HelpCircle, { className: "w-10 h-10 text-slate-400" }) }),
          /* @__PURE__ */ jsx("h2", { className: "text-2xl font-bold text-slate-900 mb-2", children: "Aucune question disponible" }),
          /* @__PURE__ */ jsx("p", { className: "text-slate-600", children: "Les questions fréquentes seront bientôt disponibles." })
        ] }) : /* @__PURE__ */ jsx("div", { className: "space-y-12", children: Object.entries(faqItems).map(([category, items], categoryIndex) => /* @__PURE__ */ jsxs(
          "div",
          {
            className: "animate-fade-in",
            style: { animationDelay: `${categoryIndex * 100}ms` },
            children: [
              /* @__PURE__ */ jsx("div", { className: "mb-6", children: /* @__PURE__ */ jsxs("h2", { className: "text-3xl font-bold text-slate-900 flex items-center", children: [
                /* @__PURE__ */ jsx("span", { className: "w-1.5 h-8 bg-gradient-to-b from-blue-600 to-cyan-600 rounded-full mr-4" }),
                category
              ] }) }),
              /* @__PURE__ */ jsx("div", { className: "space-y-4", children: items.map((item, index) => /* @__PURE__ */ jsxs(
                "div",
                {
                  className: "group bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border border-slate-200 overflow-hidden",
                  style: { animationDelay: `${categoryIndex * 100 + index * 50}ms` },
                  children: [
                    /* @__PURE__ */ jsxs(
                      "button",
                      {
                        onClick: () => toggleItem(item.id),
                        className: "w-full px-6 py-5 text-left flex items-start justify-between gap-4 hover:bg-slate-50 transition-colors duration-200",
                        "aria-expanded": openItems[item.id],
                        children: [
                          /* @__PURE__ */ jsx("div", { className: "flex-1", children: /* @__PURE__ */ jsx("h3", { className: "text-lg font-semibold text-slate-900 leading-relaxed group-hover:text-blue-600 transition-colors duration-200", children: item.question }) }),
                          /* @__PURE__ */ jsx("div", { className: `flex-shrink-0 mt-1 transform transition-transform duration-300 ${openItems[item.id] ? "rotate-180" : ""}`, children: /* @__PURE__ */ jsx(ChevronDown, { className: "w-5 h-5 text-slate-400 group-hover:text-blue-600" }) })
                        ]
                      }
                    ),
                    /* @__PURE__ */ jsx(
                      "div",
                      {
                        className: `transition-all duration-300 ease-in-out ${openItems[item.id] ? "max-h-[2000px] opacity-100" : "max-h-0 opacity-0"}`,
                        children: /* @__PURE__ */ jsxs("div", { className: "px-6 pb-6 pt-2", children: [
                          /* @__PURE__ */ jsx("div", { className: "w-12 h-1 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-full mb-4" }),
                          /* @__PURE__ */ jsx(
                            "div",
                            {
                              className: "prose prose-slate max-w-none text-slate-700 leading-relaxed",
                              dangerouslySetInnerHTML: { __html: item.answer }
                            }
                          )
                        ] })
                      }
                    )
                  ]
                },
                item.id
              )) })
            ]
          },
          category
        )) }),
        /* @__PURE__ */ jsx("div", { className: "mt-20 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-2xl shadow-xl overflow-hidden", children: /* @__PURE__ */ jsxs("div", { className: "relative px-8 py-12 sm:px-12 sm:py-16", children: [
          /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-black opacity-5" }),
          /* @__PURE__ */ jsx("div", { className: "absolute inset-0", style: {
            backgroundImage: "radial-gradient(circle at 30% 20%, rgba(255, 255, 255, 0.1) 0%, transparent 50%)"
          } }),
          /* @__PURE__ */ jsxs("div", { className: "relative text-center", children: [
            /* @__PURE__ */ jsx("div", { className: "inline-flex items-center justify-center w-16 h-16 bg-white/10 backdrop-blur-sm rounded-2xl mb-6", children: /* @__PURE__ */ jsx(MessageCircle, { className: "w-8 h-8 text-white" }) }),
            /* @__PURE__ */ jsx("h2", { className: "text-3xl font-bold text-white mb-4", children: "Vous ne trouvez pas votre réponse ?" }),
            /* @__PURE__ */ jsx("p", { className: "text-lg text-blue-100 mb-8 max-w-2xl mx-auto leading-relaxed", children: "Notre équipe est disponible 24/7 pour répondre à toutes vos questions et vous accompagner dans vos démarches" }),
            /* @__PURE__ */ jsxs("div", { className: "flex flex-col sm:flex-row gap-4 justify-center items-center", children: [
              /* @__PURE__ */ jsxs(
                "a",
                {
                  href: "/contact/",
                  className: "inline-flex items-center gap-2 bg-white text-blue-600 px-8 py-4 rounded-xl font-semibold hover:bg-blue-50 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5",
                  children: [
                    /* @__PURE__ */ jsx(Mail, { className: "w-5 h-5" }),
                    "Contactez-nous"
                  ]
                }
              ),
              /* @__PURE__ */ jsxs(
                "a",
                {
                  href: "tel:+33123456789",
                  className: "inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white px-8 py-4 rounded-xl font-semibold hover:bg-white/20 transition-all duration-200 border-2 border-white/30",
                  children: [
                    /* @__PURE__ */ jsx(Phone, { className: "w-5 h-5" }),
                    "Appelez-nous"
                  ]
                }
              )
            ] })
          ] })
        ] }) })
      ] })
    ] }),
    /* @__PURE__ */ jsx("style", { children: `
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.6s ease-out forwards;
          opacity: 0;
        }

        .prose a {
          color: #2563eb;
          text-decoration: underline;
        }

        .prose a:hover {
          color: #1d4ed8;
        }

        .prose p {
          margin-bottom: 1em;
        }

        .prose ul, .prose ol {
          margin-left: 1.5em;
          margin-bottom: 1em;
        }

        .prose li {
          margin-bottom: 0.5em;
        }

        .prose strong {
          font-weight: 600;
          color: #1e293b;
        }
      ` })
  ] });
}
function MentionsLegales() {
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(
      SEOHead,
      {
        title: "Mentions Légales | Taxi VSL Île-de-France",
        description: "Mentions légales de Taxi VSL Île-de-France. Informations sur l'éditeur, l'hébergement et les responsabilités.",
        canonical: "https://www.taxisparis-conventionnes.fr/mentions-legales"
      }
    ),
    /* @__PURE__ */ jsx("div", { className: "min-h-screen bg-gray-50 py-12", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-4 max-w-3xl", children: [
      /* @__PURE__ */ jsx("h1", { className: "text-3xl font-bold text-gray-900 mb-8", children: "Mentions Légales" }),
      /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-2xl shadow-sm p-8 space-y-8 text-gray-700", children: [
        /* @__PURE__ */ jsxs("section", { children: [
          /* @__PURE__ */ jsx("h2", { className: "text-xl font-semibold text-gray-900 mb-3", children: "1. Éditeur du site" }),
          /* @__PURE__ */ jsxs("p", { className: "leading-relaxed", children: [
            "Le présent site est édité par :",
            /* @__PURE__ */ jsx("br", {}),
            /* @__PURE__ */ jsx("br", {}),
            /* @__PURE__ */ jsx("strong", { children: "Taxi VSL Île-de-France" }),
            /* @__PURE__ */ jsx("br", {}),
            "Siège social : Paris, Île-de-France",
            /* @__PURE__ */ jsx("br", {}),
            "Téléphone : ",
            /* @__PURE__ */ jsx("a", { href: "tel:+33650366491", className: "text-blue-600 hover:underline", children: "06 50 36 64 91" }),
            /* @__PURE__ */ jsx("br", {}),
            "Email : ",
            /* @__PURE__ */ jsx("a", { href: "mailto:contact@taxisparis-conventionnes.fr", className: "text-blue-600 hover:underline", children: "contact@taxisparis-conventionnes.fr" })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("section", { children: [
          /* @__PURE__ */ jsx("h2", { className: "text-xl font-semibold text-gray-900 mb-3", children: "2. Directeur de la publication" }),
          /* @__PURE__ */ jsx("p", { className: "leading-relaxed", children: "Le directeur de la publication est le représentant légal de la société Taxi VSL Île-de-France." })
        ] }),
        /* @__PURE__ */ jsxs("section", { children: [
          /* @__PURE__ */ jsx("h2", { className: "text-xl font-semibold text-gray-900 mb-3", children: "3. Hébergement" }),
          /* @__PURE__ */ jsxs("p", { className: "leading-relaxed", children: [
            "Ce site est hébergé par :",
            /* @__PURE__ */ jsx("br", {}),
            /* @__PURE__ */ jsx("br", {}),
            /* @__PURE__ */ jsx("strong", { children: "OVH SAS" }),
            /* @__PURE__ */ jsx("br", {}),
            "2 rue Kellermann – 59100 Roubaix – France",
            /* @__PURE__ */ jsx("br", {}),
            "Téléphone : 1007",
            /* @__PURE__ */ jsx("br", {}),
            /* @__PURE__ */ jsx("a", { href: "https://www.ovh.com", className: "text-blue-600 hover:underline", target: "_blank", rel: "noopener noreferrer", children: "www.ovh.com" })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("section", { children: [
          /* @__PURE__ */ jsx("h2", { className: "text-xl font-semibold text-gray-900 mb-3", children: "4. Propriété intellectuelle" }),
          /* @__PURE__ */ jsx("p", { className: "leading-relaxed", children: "L'ensemble des contenus présents sur ce site (textes, images, graphismes, logos) est la propriété exclusive de Taxi VSL Île-de-France, sauf mentions contraires. Toute reproduction, distribution ou utilisation sans autorisation préalable est strictement interdite." })
        ] }),
        /* @__PURE__ */ jsxs("section", { children: [
          /* @__PURE__ */ jsx("h2", { className: "text-xl font-semibold text-gray-900 mb-3", children: "5. Données personnelles" }),
          /* @__PURE__ */ jsxs("p", { className: "leading-relaxed", children: [
            "Conformément au Règlement Général sur la Protection des Données (RGPD) et à la loi Informatique et Libertés, vous disposez d'un droit d'accès, de rectification et de suppression de vos données personnelles. Pour exercer ces droits, contactez-nous à : ",
            /* @__PURE__ */ jsx("a", { href: "mailto:contact@taxisparis-conventionnes.fr", className: "text-blue-600 hover:underline", children: "contact@taxisparis-conventionnes.fr" }),
            "."
          ] })
        ] }),
        /* @__PURE__ */ jsxs("section", { children: [
          /* @__PURE__ */ jsx("h2", { className: "text-xl font-semibold text-gray-900 mb-3", children: "6. Cookies" }),
          /* @__PURE__ */ jsx("p", { className: "leading-relaxed", children: "Ce site utilise des cookies à des fins d'analyse d'audience (Google Analytics). Vous pouvez désactiver les cookies dans les paramètres de votre navigateur." })
        ] }),
        /* @__PURE__ */ jsxs("section", { children: [
          /* @__PURE__ */ jsx("h2", { className: "text-xl font-semibold text-gray-900 mb-3", children: "7. Limitation de responsabilité" }),
          /* @__PURE__ */ jsx("p", { className: "leading-relaxed", children: "Taxi VSL Île-de-France s'efforce d'assurer l'exactitude et la mise à jour des informations diffusées sur ce site. Toutefois, nous déclinons toute responsabilité pour les erreurs ou omissions dans le contenu du site, ainsi que pour tout dommage résultant de l'utilisation de ce site." })
        ] }),
        /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-500 pt-4 border-t border-gray-100", children: "Dernière mise à jour : mai 2026" })
      ] })
    ] }) })
  ] });
}
function CGV() {
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(
      SEOHead,
      {
        title: "Conditions Générales de Vente | Taxi VSL Île-de-France",
        description: "Conditions générales de vente de Taxi VSL Île-de-France. Tarifs, modalités de réservation et politique d'annulation.",
        canonical: "https://www.taxisparis-conventionnes.fr/conditions-generales-de-vente"
      }
    ),
    /* @__PURE__ */ jsx("div", { className: "min-h-screen bg-gray-50 py-12", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-4 max-w-3xl", children: [
      /* @__PURE__ */ jsx("h1", { className: "text-3xl font-bold text-gray-900 mb-8", children: "Conditions Générales de Vente" }),
      /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-2xl shadow-sm p-8 space-y-8 text-gray-700", children: [
        /* @__PURE__ */ jsxs("section", { children: [
          /* @__PURE__ */ jsx("h2", { className: "text-xl font-semibold text-gray-900 mb-3", children: "1. Objet" }),
          /* @__PURE__ */ jsx("p", { className: "leading-relaxed", children: "Les présentes Conditions Générales de Vente (CGV) régissent les relations contractuelles entre Taxi VSL Île-de-France et ses clients dans le cadre de la fourniture de services de transport (taxi conventionné, VSL, transferts aéroport/gare)." })
        ] }),
        /* @__PURE__ */ jsxs("section", { children: [
          /* @__PURE__ */ jsx("h2", { className: "text-xl font-semibold text-gray-900 mb-3", children: "2. Services proposés" }),
          /* @__PURE__ */ jsx("p", { className: "leading-relaxed", children: "Taxi VSL Île-de-France propose les services suivants :" }),
          /* @__PURE__ */ jsxs("ul", { className: "list-disc list-inside mt-2 space-y-1 leading-relaxed", children: [
            /* @__PURE__ */ jsx("li", { children: "Taxi conventionné Assurance Maladie (prescription médicale)" }),
            /* @__PURE__ */ jsx("li", { children: "VSL (Véhicule Sanitaire Léger)" }),
            /* @__PURE__ */ jsx("li", { children: "Transferts vers aéroports parisiens (CDG, Orly, Beauvais)" }),
            /* @__PURE__ */ jsx("li", { children: "Transferts vers gares parisiennes" }),
            /* @__PURE__ */ jsx("li", { children: "Courses à la demande en Île-de-France" })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("section", { children: [
          /* @__PURE__ */ jsx("h2", { className: "text-xl font-semibold text-gray-900 mb-3", children: "3. Tarifs" }),
          /* @__PURE__ */ jsx("p", { className: "leading-relaxed", children: "Les tarifs appliqués sont conformes à la réglementation tarifaire préfectorale en vigueur pour les taxis conventionnés. Pour les courses non conventionnées, un devis est établi sur demande. Les prix sont exprimés en euros TTC." })
        ] }),
        /* @__PURE__ */ jsxs("section", { children: [
          /* @__PURE__ */ jsx("h2", { className: "text-xl font-semibold text-gray-900 mb-3", children: "4. Réservation" }),
          /* @__PURE__ */ jsxs("p", { className: "leading-relaxed", children: [
            "Les réservations peuvent être effectuées :",
            /* @__PURE__ */ jsx("br", {}),
            /* @__PURE__ */ jsx("br", {}),
            "— Par téléphone : ",
            /* @__PURE__ */ jsx("a", { href: "tel:+33650366491", className: "text-blue-600 hover:underline", children: "06 50 36 64 91" }),
            " (24h/24, 7j/7)",
            /* @__PURE__ */ jsx("br", {}),
            "— Via le formulaire en ligne sur notre site",
            /* @__PURE__ */ jsx("br", {}),
            "— Par email : ",
            /* @__PURE__ */ jsx("a", { href: "mailto:contact@taxisparis-conventionnes.fr", className: "text-blue-600 hover:underline", children: "contact@taxisparis-conventionnes.fr" }),
            /* @__PURE__ */ jsx("br", {}),
            /* @__PURE__ */ jsx("br", {}),
            "Toute réservation confirmée engage le client."
          ] })
        ] }),
        /* @__PURE__ */ jsxs("section", { children: [
          /* @__PURE__ */ jsx("h2", { className: "text-xl font-semibold text-gray-900 mb-3", children: "5. Annulation" }),
          /* @__PURE__ */ jsx("p", { className: "leading-relaxed", children: "Toute annulation doit être signalée au minimum 2 heures avant l'heure de prise en charge prévue. En cas d'annulation tardive ou d'absence du client, des frais peuvent être facturés selon les conditions convenues lors de la réservation." })
        ] }),
        /* @__PURE__ */ jsxs("section", { children: [
          /* @__PURE__ */ jsx("h2", { className: "text-xl font-semibold text-gray-900 mb-3", children: "6. Paiement" }),
          /* @__PURE__ */ jsx("p", { className: "leading-relaxed", children: "Le règlement s'effectue à la fin de la course, en espèces ou par carte bancaire. Pour les courses conventionnées, la prise en charge par l'Assurance Maladie est effectuée sur présentation d'une prescription médicale de transport valide." })
        ] }),
        /* @__PURE__ */ jsxs("section", { children: [
          /* @__PURE__ */ jsx("h2", { className: "text-xl font-semibold text-gray-900 mb-3", children: "7. Responsabilité" }),
          /* @__PURE__ */ jsx("p", { className: "leading-relaxed", children: "Taxi VSL Île-de-France est couvert par une assurance responsabilité civile professionnelle. Notre responsabilité ne saurait être engagée en cas de force majeure, conditions météorologiques exceptionnelles, ou événements indépendants de notre volonté entraînant un retard ou une impossibilité de service." })
        ] }),
        /* @__PURE__ */ jsxs("section", { children: [
          /* @__PURE__ */ jsx("h2", { className: "text-xl font-semibold text-gray-900 mb-3", children: "8. Droit applicable" }),
          /* @__PURE__ */ jsx("p", { className: "leading-relaxed", children: "Les présentes CGV sont soumises au droit français. En cas de litige, les parties s'efforceront de trouver une solution amiable. À défaut, les tribunaux compétents de Paris seront saisis." })
        ] }),
        /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-500 pt-4 border-t border-gray-100", children: "Dernière mise à jour : mai 2026" })
      ] })
    ] }) })
  ] });
}
function ConditionsGenerales() {
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(
      SEOHead,
      {
        title: "Conditions Générales d'Utilisation | Taxi VSL Île-de-France",
        description: "Conditions générales d'utilisation du site Taxi VSL Île-de-France. Accès au site, responsabilités et protection des données.",
        canonical: "https://www.taxisparis-conventionnes.fr/conditions-generales"
      }
    ),
    /* @__PURE__ */ jsx("div", { className: "min-h-screen bg-gray-50 py-12", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-4 max-w-3xl", children: [
      /* @__PURE__ */ jsx("h1", { className: "text-3xl font-bold text-gray-900 mb-8", children: "Conditions Générales d'Utilisation" }),
      /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-2xl shadow-sm p-8 space-y-8 text-gray-700", children: [
        /* @__PURE__ */ jsxs("section", { children: [
          /* @__PURE__ */ jsx("h2", { className: "text-xl font-semibold text-gray-900 mb-3", children: "1. Acceptation des conditions" }),
          /* @__PURE__ */ jsxs("p", { className: "leading-relaxed", children: [
            "L'accès et l'utilisation du site ",
            /* @__PURE__ */ jsx("strong", { children: "taxisparis-conventionnes.fr" }),
            " impliquent l'acceptation pleine et entière des présentes Conditions Générales d'Utilisation (CGU). Si vous n'acceptez pas ces conditions, veuillez ne pas utiliser ce site."
          ] })
        ] }),
        /* @__PURE__ */ jsxs("section", { children: [
          /* @__PURE__ */ jsx("h2", { className: "text-xl font-semibold text-gray-900 mb-3", children: "2. Accès au site" }),
          /* @__PURE__ */ jsx("p", { className: "leading-relaxed", children: "Le site est accessible gratuitement à tout utilisateur disposant d'un accès à Internet. Taxi VSL Île-de-France se réserve le droit de modifier, suspendre ou interrompre l'accès au site à tout moment, sans préavis ni indemnité." })
        ] }),
        /* @__PURE__ */ jsxs("section", { children: [
          /* @__PURE__ */ jsx("h2", { className: "text-xl font-semibold text-gray-900 mb-3", children: "3. Utilisation du site" }),
          /* @__PURE__ */ jsx("p", { className: "leading-relaxed", children: "L'utilisateur s'engage à utiliser ce site conformément aux lois en vigueur et aux présentes CGU. Il est notamment interdit de :" }),
          /* @__PURE__ */ jsxs("ul", { className: "list-disc list-inside mt-2 space-y-1 leading-relaxed", children: [
            /* @__PURE__ */ jsx("li", { children: "Diffuser des contenus illicites, offensants ou contraires à l'ordre public" }),
            /* @__PURE__ */ jsx("li", { children: "Tenter d'accéder de manière non autorisée aux systèmes informatiques" }),
            /* @__PURE__ */ jsx("li", { children: "Utiliser le site à des fins commerciales sans autorisation préalable" }),
            /* @__PURE__ */ jsx("li", { children: "Reproduire ou copier les contenus sans accord écrit" })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("section", { children: [
          /* @__PURE__ */ jsx("h2", { className: "text-xl font-semibold text-gray-900 mb-3", children: "4. Formulaires et données collectées" }),
          /* @__PURE__ */ jsx("p", { className: "leading-relaxed", children: "Les formulaires présents sur ce site (réservation, contact) collectent des données personnelles nécessaires au traitement de vos demandes (nom, prénom, téléphone, adresse, email). Ces données sont traitées conformément au RGPD et à notre politique de confidentialité. Elles ne sont pas transmises à des tiers à des fins commerciales." })
        ] }),
        /* @__PURE__ */ jsxs("section", { children: [
          /* @__PURE__ */ jsx("h2", { className: "text-xl font-semibold text-gray-900 mb-3", children: "5. Liens hypertextes" }),
          /* @__PURE__ */ jsx("p", { className: "leading-relaxed", children: "Ce site peut contenir des liens vers des sites tiers. Taxi VSL Île-de-France n'exerce aucun contrôle sur ces sites et décline toute responsabilité quant à leur contenu ou leur disponibilité." })
        ] }),
        /* @__PURE__ */ jsxs("section", { children: [
          /* @__PURE__ */ jsx("h2", { className: "text-xl font-semibold text-gray-900 mb-3", children: "6. Protection des données personnelles" }),
          /* @__PURE__ */ jsx("p", { className: "leading-relaxed", children: "Conformément au RGPD, vous disposez des droits suivants sur vos données :" }),
          /* @__PURE__ */ jsxs("ul", { className: "list-disc list-inside mt-2 space-y-1 leading-relaxed", children: [
            /* @__PURE__ */ jsx("li", { children: "Droit d'accès et de rectification" }),
            /* @__PURE__ */ jsx("li", { children: "Droit à l'effacement (droit à l'oubli)" }),
            /* @__PURE__ */ jsx("li", { children: "Droit à la portabilité" }),
            /* @__PURE__ */ jsx("li", { children: "Droit d'opposition au traitement" })
          ] }),
          /* @__PURE__ */ jsxs("p", { className: "leading-relaxed mt-2", children: [
            "Pour exercer ces droits : ",
            /* @__PURE__ */ jsx("a", { href: "mailto:contact@taxisparis-conventionnes.fr", className: "text-blue-600 hover:underline", children: "contact@taxisparis-conventionnes.fr" })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("section", { children: [
          /* @__PURE__ */ jsx("h2", { className: "text-xl font-semibold text-gray-900 mb-3", children: "7. Droit applicable" }),
          /* @__PURE__ */ jsx("p", { className: "leading-relaxed", children: "Les présentes CGU sont soumises au droit français. Tout litige relatif à l'interprétation ou l'exécution des présentes sera soumis aux tribunaux compétents de Paris." })
        ] }),
        /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-500 pt-4 border-t border-gray-100", children: "Dernière mise à jour : mai 2026" })
      ] })
    ] }) })
  ] });
}
function NotFound() {
  useEffect(() => {
    document.title = "Page introuvable – 404 | Taxis Paris Conventionnés";
  }, []);
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs(Helmet, { children: [
      /* @__PURE__ */ jsx("title", { children: "Page introuvable – 404 | Taxis Paris Conventionnés" }),
      /* @__PURE__ */ jsx("meta", { name: "description", content: "La page que vous recherchez n'existe pas ou a été déplacée." }),
      /* @__PURE__ */ jsx("meta", { name: "robots", content: "noindex, nofollow" })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4 text-center", children: /* @__PURE__ */ jsxs("div", { className: "max-w-md", children: [
      /* @__PURE__ */ jsx("p", { className: "text-8xl font-bold text-gray-200 select-none", children: "404" }),
      /* @__PURE__ */ jsx("h1", { className: "mt-4 text-2xl font-semibold text-gray-800", children: "Page introuvable" }),
      /* @__PURE__ */ jsx("p", { className: "mt-3 text-gray-500 leading-relaxed", children: "La page que vous recherchez n'existe pas ou a été déplacée." }),
      /* @__PURE__ */ jsx(
        Link,
        {
          to: "/",
          className: "mt-8 inline-block bg-yellow-500 hover:bg-yellow-600 text-white font-semibold px-6 py-3 rounded-lg transition-colors",
          children: "Retour à l'accueil"
        }
      )
    ] }) })
  ] });
}
function TrailingSlashRedirect() {
  const location = useLocation();
  const path = location.pathname;
  if (path !== "/" && path.endsWith("/")) {
    return /* @__PURE__ */ jsx(Navigate, { to: `${path.slice(0, -1)}${location.search}${location.hash}`, replace: true });
  }
  return null;
}
function ProtectedRoute({ children }) {
  const { user, loading } = useAdminAuth();
  if (loading) {
    return /* @__PURE__ */ jsx("div", { className: "min-h-screen flex items-center justify-center", children: "Chargement..." });
  }
  if (!user) {
    return /* @__PURE__ */ jsx(Navigate, { to: "/admin/login", replace: true });
  }
  return /* @__PURE__ */ jsx(Fragment, { children });
}
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}
function AppContent() {
  const navigate = useNavigate();
  const location = useLocation();
  const [measurementId, setMeasurementId] = useState("");
  useEffect(() => {
    {
      const fetchAnalyticsId = async () => {
        var _a2;
        const { data } = await supabase.from("settings").select("value").eq("key", "google_analytics").single();
        if ((_a2 = data == null ? void 0 : data.value) == null ? void 0 : _a2.measurement_id) {
          setMeasurementId(data.value.measurement_id);
        }
      };
      fetchAnalyticsId();
    }
  }, []);
  const handleNavigate = (page) => {
    navigate(page);
  };
  console.log("SSR LOCATION:", location.pathname);
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(GoogleAnalytics, { measurementId }),
    /* @__PURE__ */ jsx(ScrollToTop, {}),
    /* @__PURE__ */ jsx("a", { href: "#main-content", className: "skip-to-main", children: "Aller au contenu principal" }),
    /* @__PURE__ */ jsxs("div", { className: `min-h-screen bg-gray-50 flex flex-col ${location.pathname === "/" ? "app-background-home" : ""}`, children: [
      !location.pathname.startsWith("/admin") && /* @__PURE__ */ jsx(Header, { onNavigate: handleNavigate }),
      /* @__PURE__ */ jsx("main", { id: "main-content", className: "flex-grow", role: "main", children: /* @__PURE__ */ jsxs(Routes, { children: [
        /* @__PURE__ */ jsx(Route, { path: "/", element: /* @__PURE__ */ jsx(Home, { onNavigate: handleNavigate }) }),
        /* @__PURE__ */ jsx(Route, { path: "/admin", element: /* @__PURE__ */ jsx(Navigate, { to: "/admin/login", replace: true }) }),
        /* @__PURE__ */ jsx(Route, { path: "/admin/login", element: /* @__PURE__ */ jsx(AdminLogin, {}) }),
        /* @__PURE__ */ jsx(Route, { path: "/admin/dashboard", element: /* @__PURE__ */ jsx(ProtectedRoute, { children: /* @__PURE__ */ jsx(Dashboard, {}) }) }),
        /* @__PURE__ */ jsx(Route, { path: "/admin/pages", element: /* @__PURE__ */ jsx(ProtectedRoute, { children: /* @__PURE__ */ jsx(PagesManager, {}) }) }),
        /* @__PURE__ */ jsx(Route, { path: "/admin/pages/:id", element: /* @__PURE__ */ jsx(ProtectedRoute, { children: /* @__PURE__ */ jsx(PageEditorEnhanced, {}) }) }),
        /* @__PURE__ */ jsx(Route, { path: "/admin/blog", element: /* @__PURE__ */ jsx(ProtectedRoute, { children: /* @__PURE__ */ jsx(BlogManager, {}) }) }),
        /* @__PURE__ */ jsx(Route, { path: "/admin/blog/:id", element: /* @__PURE__ */ jsx(ProtectedRoute, { children: /* @__PURE__ */ jsx(BlogEditor, {}) }) }),
        /* @__PURE__ */ jsx(Route, { path: "/admin/department-gallery", element: /* @__PURE__ */ jsx(ProtectedRoute, { children: /* @__PURE__ */ jsx(DepartmentGallery, {}) }) }),
        /* @__PURE__ */ jsx(Route, { path: "/admin/media", element: /* @__PURE__ */ jsx(ProtectedRoute, { children: /* @__PURE__ */ jsx(MediaManagerEnhanced, {}) }) }),
        /* @__PURE__ */ jsx(Route, { path: "/admin/logo", element: /* @__PURE__ */ jsx(ProtectedRoute, { children: /* @__PURE__ */ jsx(LogoSettings, {}) }) }),
        /* @__PURE__ */ jsx(Route, { path: "/admin/analytics", element: /* @__PURE__ */ jsx(ProtectedRoute, { children: /* @__PURE__ */ jsx(Analytics, {}) }) }),
        /* @__PURE__ */ jsx(Route, { path: "/admin/faq", element: /* @__PURE__ */ jsx(ProtectedRoute, { children: /* @__PURE__ */ jsx(FAQManager, {}) }) }),
        /* @__PURE__ */ jsx(Route, { path: "/admin/settings", element: /* @__PURE__ */ jsx(ProtectedRoute, { children: /* @__PURE__ */ jsx(Settings, {}) }) }),
        /* @__PURE__ */ jsx(Route, { path: "/reservation-taxi-vsl/", element: /* @__PURE__ */ jsx(Navigate, { to: "/reservation-taxi-vsl", replace: true }) }),
        /* @__PURE__ */ jsx(Route, { path: "/reservation-taxi-vsl", element: /* @__PURE__ */ jsx(ReservationPage, {}) }),
        /* @__PURE__ */ jsx(Route, { path: "/zones-desservies/", element: /* @__PURE__ */ jsx(Navigate, { to: "/zones-desservies", replace: true }) }),
        /* @__PURE__ */ jsx(Route, { path: "/zones-desservies", element: /* @__PURE__ */ jsx(Zones, { onNavigate: handleNavigate }) }),
        /* @__PURE__ */ jsx(Route, { path: "/taxis-aeroports-parisiens/", element: /* @__PURE__ */ jsx(Navigate, { to: "/taxis-aeroports-parisiens", replace: true }) }),
        /* @__PURE__ */ jsx(Route, { path: "/taxis-aeroports-parisiens", element: /* @__PURE__ */ jsx(AirportTransfer, {}) }),
        /* @__PURE__ */ jsx(Route, { path: "/taxis-gares-parisiennes/", element: /* @__PURE__ */ jsx(Navigate, { to: "/taxis-gares-parisiennes", replace: true }) }),
        /* @__PURE__ */ jsx(Route, { path: "/taxis-gares-parisiennes", element: /* @__PURE__ */ jsx(StationTransfer, {}) }),
        /* @__PURE__ */ jsx(Route, { path: "/qui-sommes-nous/", element: /* @__PURE__ */ jsx(Navigate, { to: "/qui-sommes-nous", replace: true }) }),
        /* @__PURE__ */ jsx(Route, { path: "/qui-sommes-nous", element: /* @__PURE__ */ jsx(About, {}) }),
        /* @__PURE__ */ jsx(Route, { path: "/blog/", element: /* @__PURE__ */ jsx(Navigate, { to: "/blog", replace: true }) }),
        /* @__PURE__ */ jsx(Route, { path: "/blog", element: /* @__PURE__ */ jsx(Blog, { onNavigate: handleNavigate }) }),
        /* @__PURE__ */ jsx(Route, { path: "/blog/:slug", element: /* @__PURE__ */ jsx(BlogPost, {}) }),
        /* @__PURE__ */ jsx(Route, { path: "/faq/", element: /* @__PURE__ */ jsx(Navigate, { to: "/faq", replace: true }) }),
        /* @__PURE__ */ jsx(Route, { path: "/faq", element: /* @__PURE__ */ jsx(FAQ, {}) }),
        /* @__PURE__ */ jsx(Route, { path: "/contact/", element: /* @__PURE__ */ jsx(Navigate, { to: "/contact", replace: true }) }),
        /* @__PURE__ */ jsx(Route, { path: "/contact", element: /* @__PURE__ */ jsx(Contact, {}) }),
        /* @__PURE__ */ jsx(Route, { path: "/taxi-conventionne-paris-75/", element: /* @__PURE__ */ jsx(Navigate, { to: "/taxi-conventionne-paris-75", replace: true }) }),
        /* @__PURE__ */ jsx(Route, { path: "/taxi-conventionne-paris-75", element: /* @__PURE__ */ jsx(DepartmentPage, { department: "75", onNavigate: handleNavigate }) }),
        /* @__PURE__ */ jsx(Route, { path: "/taxi-conventionne-essonne-91/", element: /* @__PURE__ */ jsx(Navigate, { to: "/taxi-conventionne-essonne-91", replace: true }) }),
        /* @__PURE__ */ jsx(Route, { path: "/taxi-conventionne-essonne-91", element: /* @__PURE__ */ jsx(DepartmentPage, { department: "91", onNavigate: handleNavigate }) }),
        /* @__PURE__ */ jsx(Route, { path: "/taxi-conventionne-hauts-de-seine-92/", element: /* @__PURE__ */ jsx(Navigate, { to: "/taxi-conventionne-hauts-de-seine-92", replace: true }) }),
        /* @__PURE__ */ jsx(Route, { path: "/taxi-conventionne-hauts-de-seine-92", element: /* @__PURE__ */ jsx(DepartmentPage, { department: "92", onNavigate: handleNavigate }) }),
        /* @__PURE__ */ jsx(Route, { path: "/taxi-conventionne-seine-saint-denis-93/", element: /* @__PURE__ */ jsx(Navigate, { to: "/taxi-conventionne-seine-saint-denis-93", replace: true }) }),
        /* @__PURE__ */ jsx(Route, { path: "/taxi-conventionne-seine-saint-denis-93", element: /* @__PURE__ */ jsx(DepartmentPage, { department: "93", onNavigate: handleNavigate }) }),
        /* @__PURE__ */ jsx(Route, { path: "/taxi-conventionne-val-de-marne-94/", element: /* @__PURE__ */ jsx(Navigate, { to: "/taxi-conventionne-val-de-marne-94", replace: true }) }),
        /* @__PURE__ */ jsx(Route, { path: "/taxi-conventionne-val-de-marne-94", element: /* @__PURE__ */ jsx(DepartmentPage, { department: "94", onNavigate: handleNavigate }) }),
        /* @__PURE__ */ jsx(Route, { path: "/:departmentSlug/:citySlug", element: /* @__PURE__ */ jsx(CityPage, {}) }),
        /* @__PURE__ */ jsx(Route, { path: "/:departmentSlug/:citySlug/", element: /* @__PURE__ */ jsx(TrailingSlashRedirect, {}) }),
        /* @__PURE__ */ jsx(Route, { path: "/mentions-legales/", element: /* @__PURE__ */ jsx(Navigate, { to: "/mentions-legales", replace: true }) }),
        /* @__PURE__ */ jsx(Route, { path: "/mentions-legales", element: /* @__PURE__ */ jsx(MentionsLegales, {}) }),
        /* @__PURE__ */ jsx(Route, { path: "/conditions-generales-de-vente/", element: /* @__PURE__ */ jsx(Navigate, { to: "/conditions-generales-de-vente", replace: true }) }),
        /* @__PURE__ */ jsx(Route, { path: "/conditions-generales-de-vente", element: /* @__PURE__ */ jsx(CGV, {}) }),
        /* @__PURE__ */ jsx(Route, { path: "/conditions-generales/", element: /* @__PURE__ */ jsx(Navigate, { to: "/conditions-generales", replace: true }) }),
        /* @__PURE__ */ jsx(Route, { path: "/conditions-generales", element: /* @__PURE__ */ jsx(ConditionsGenerales, {}) }),
        /* @__PURE__ */ jsx(Route, { path: "/zones/:zone", element: /* @__PURE__ */ jsx(ZoneDetail, { zone: "", onNavigate: handleNavigate }) }),
        /* @__PURE__ */ jsx(Route, { path: "/stations", element: /* @__PURE__ */ jsx(Stations, { onNavigate: handleNavigate }) }),
        /* @__PURE__ */ jsx(Route, { path: "*", element: /* @__PURE__ */ jsx(NotFound, {}) })
      ] }) }),
      !location.pathname.startsWith("/admin") && /* @__PURE__ */ jsx(Footer, { onNavigate: handleNavigate })
    ] })
  ] });
}
function App() {
  return /* @__PURE__ */ jsx(AdminAuthProvider, { children: /* @__PURE__ */ jsx(AppContent, {}) });
}
function render(url) {
  const helmetContext = {};
  const html = ReactDOMServer.renderToString(
    /* @__PURE__ */ React.createElement(React.StrictMode, null, /* @__PURE__ */ React.createElement(HelmetProvider, { context: helmetContext }, /* @__PURE__ */ React.createElement(StaticRouter, { location: url }, /* @__PURE__ */ React.createElement(App, null))))
  );
  const { helmet } = helmetContext;
  return {
    html,
    helmet: helmet || {
      htmlAttributes: { toString: () => "" },
      bodyAttributes: { toString: () => "" },
      title: { toString: () => "<title>Taxi VSL Conventionné</title>" },
      meta: { toString: () => "" },
      link: { toString: () => "" },
      script: { toString: () => "" }
    }
  };
}
export {
  render
};
