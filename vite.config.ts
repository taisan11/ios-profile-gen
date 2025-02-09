import { defineConfig } from 'vite'
import { readdirSync,statSync } from 'node:fs'
import { resolve,join } from 'node:path'

function getHtmlFiles(dir: string): string[] {
    let htmlFiles: string[] = []
    const files = readdirSync(dir)
    for (const file of files) {
        const filePath = join(dir, file)
        if (statSync(filePath).isDirectory()) {
            htmlFiles = htmlFiles.concat(getHtmlFiles(filePath))
        } else if (file.endsWith('.html')) {
            htmlFiles.push(filePath)
        }
    }
    return htmlFiles
}

const htmlFiles = getHtmlFiles('./src/')
const input = htmlFiles.reduce((acc, file) => {
    const name = file.replace('.html', '').replace(/\//g, '_').replace(/\\/g, '_')
    acc[name] = resolve(__dirname, file)
    return acc
}, {})
export default defineConfig({
    root: 'src',
    publicDir: '../public',
    build: {
        outDir: '../dist', // Specify the output directory
        emptyOutDir: true,
        rollupOptions: {
            input
        },
        minify: true
    }
})