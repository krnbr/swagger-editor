import createSafeActionWrapper from '../../utils/create-safe-action-wrapper.js';

const localStorageKey = 'editor-preview-mustache-context';

export const previewMounted = createSafeActionWrapper((oriAction, system) => async () => {
  const { editorSelectors, fn } = system;
  const contextFromState = system.editorPreviewMustacheSelectors.selectContext();
  const contextFromLocalStorage = localStorage.getItem(localStorageKey);

  if (contextFromLocalStorage !== contextFromState) {
    // getting context from local storage
    system.editorPreviewMustacheActions.setContext({
      context: contextFromLocalStorage,
      origin: 'local-storage',
    });
    system.editorPreviewMustacheActions.pushContext({ context: contextFromLocalStorage });
  } else {
    // getting context from ApiDOM Language Service
    await fn.waitUntil(() => !!editorSelectors.selectEditor());
    await system.editorPreviewMustacheActions.pullContext({ url: null });
  }
});

export const pullContextSuccess = createSafeActionWrapper((oriAction, system) => (payload) => {
  system.editorPreviewMustacheActions.setContext({
    context: payload.context,
    origin: 'monaco-language-apidom',
  });
});

export const setContext = createSafeActionWrapper((oriAction, system) => async (payload) => {
  const template = await system.editorPreviewMustacheSelectors.selectParseSource();
  const { context, origin } = payload;

  if (origin !== 'local-storage') {
    localStorage.setItem(localStorageKey, context);
  }

  if (origin === 'editor') {
    await system.editorPreviewMustacheActions.pushContext({ context });
  }

  await system.editorPreviewMustacheActions.renderTemplate({ template, context });
});
