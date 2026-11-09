const assert = require('node:assert/strict');
const { readFileSync } = require('node:fs');
const { join } = require('node:path');
const { test } = require('node:test');
const vm = require('node:vm');

async function connectionPage(signIn = async () => undefined) {
  const nodes = new Map();
  const events = new Map();
  let configuration;
  let signInCalls = 0;
  function node(selector) {
    if (!nodes.has(selector)) nodes.set(selector, {
      hidden: true, disabled: true, elements: {}, listeners: new Map(),
      addEventListener(name, callback) { this.listeners.set(name, callback); },
      replaceChildren() {}, setAttribute() {},
    });
    return nodes.get(selector);
  }
  const context = {
    URLSearchParams,
    navigator: { language: 'es' },
    localStorage: { getItem: () => null, setItem() {} },
    window: {
      location: { hash: '#uid=' + 'a'.repeat(43), search: '' },
      addEventListener: (name, callback) => events.set(name, callback),
      AppleID: { auth: {
        init: (value) => { configuration = value; },
        signIn: async () => { signInCalls++; return signIn(); },
      } },
    },
    document: {
      documentElement: {}, querySelector: node, querySelectorAll: () => [],
      createElement: () => ({}),
      head: { append: (script) => queueMicrotask(() => script.onload()) },
    },
    fetch: async () => ({ ok: true, json: async () => ({
      prompt: 'login', csrf: 'csrf', appleClientId: 'com.example.web',
      appleRedirectUri: 'https://api.holasigue.com/oauth/apple/callback',
      appleState: 'state', appleNonce: 'nonce',
    }) }),
  };
  vm.runInNewContext(readFileSync(join(__dirname, '../connect/connect.js'), 'utf8'), context);
  await new Promise(setImmediate);
  return { node, events, configuration, calls: () => signInCalls };
}

test('Apple navigates to the API callback and stays disabled until navigation or back', async () => {
  const page = await connectionPage();
  assert.equal(page.configuration.usePopup, false);
  assert.equal(page.configuration.redirectURI, 'https://api.holasigue.com/oauth/apple/callback');
  assert.equal(page.configuration.state, 'state');
  assert.equal(page.configuration.nonce, 'nonce');
  const button = page.node('#apple-button');
  assert.equal(button.disabled, false);
  await button.listeners.get('click')();
  assert.equal(page.calls(), 1);
  assert.equal(button.disabled, true);
  assert.equal(page.node('#message').hidden, true);
  page.events.get('pageshow')();
  assert.equal(button.disabled, false);
});

test('Apple reports a start error and allows retry', async () => {
  const page = await connectionPage(async () => { throw new Error('Navigation failed'); });
  const button = page.node('#apple-button');
  await button.listeners.get('click')();
  assert.equal(button.disabled, false);
  assert.equal(page.node('#message').hidden, false);
  assert.match(page.node('#message').textContent, /No pudimos iniciar sesión/);
});
