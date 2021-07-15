import { createApp } from './main'
import { renderToString } from '@vue/server-renderer'

export async function render(url, manifest) {
  const { app, router } = createApp()

  router.push(url)
  await router.isReady()

  const ctx = {}
  const html = await renderToString(app, ctx)

  const preloadLinks = renderPreloadLinks(ctx.modules, manifest)
  return [html, preloadLinks]
}

function renderPreloadLinks(modules, manifest) {
  let links = ''
  const seen = new Set()
  modules.forEach(id => {
    const files = manifest[id]
    if (files) {
      files.forEach(file => {
        if (!seen.has(file)) {
          seen.add(file)
          links += renderPreloadLink(file)
        }
      })
    }
  })
  return links
}

function renderPreloadLink(file) {
  if (file.endsWith('.js')) {
    return `<link rel="modulepreload" crossorigin href="${file}">`
  } else if (file.endsWith('.css')) {
    return `<link rel="stylesheet" href="${file}">`
  } else if (file.endsWith('.woff') || file.endsWith('.woff2')) {
    const type = file.substr(file.lastIndexOf('.') + 1)
    return ` <link rel="preload" href="${file}" as="font" type="font/${type}" crossorigin>`
  } else if (file.endsWith('.gif') || file.endsWith('.jpg') || file.endsWith('.jpeg') || file.endsWith('.png')) {
    const isJpeg = file.endsWith('.jpg') || file.endsWith('.jpeg')
    const type = isJpeg ? 'jpeg' : file.substr(file.lastIndexOf('.') + 1)
    return ` <link rel="preload" href="${file}" as="image" type="image/${type}" crossorigin>`
  } else {
    return ''
  }
}