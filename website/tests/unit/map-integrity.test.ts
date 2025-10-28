import * as fs from 'fs'
import * as path from 'path'
import mapIndex from '@/public/maps/map-index.json'

describe('Interactive Map Integrity', () => {
  it('should have markdown files for all entries in map-index.json', () => {
    const missingFiles: string[] = []
    const documentsDir = path.join(__dirname, '../../..', 'documents')

    Object.entries(mapIndex).forEach(([number, info]) => {
      const { category, slug } = info
      const markdownPath = path.join(documentsDir, category, `${slug}.md`)

      if (!fs.existsSync(markdownPath)) {
        missingFiles.push(`${category}/${slug} (map node #${number})`)
      }
    })

    if (missingFiles.length > 0) {
      throw new Error(
        `Map nodes reference missing markdown files:\n${missingFiles.map(f => `  - ${f}`).join('\n')}`
      )
    }
  })
})
