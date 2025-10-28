import * as fs from 'fs'
import * as path from 'path'
import { getAllRelationships } from '@/lib/relationships'

describe('Relationship Graph Integrity', () => {
  it('should have markdown files for all nodes referenced in relationships.mmd', () => {
    const { relationships } = getAllRelationships()
    const missingFiles: string[] = []
    const documentsDir = path.join(__dirname, '../../..', 'documents')
    const checkedSlugs = new Set<string>()

    relationships.forEach(rel => {
      [rel.from, rel.to].forEach(fullSlug => {
        if (checkedSlugs.has(fullSlug)) return
        checkedSlugs.add(fullSlug)

        const [category, slug] = fullSlug.split('/')
        const markdownPath = path.join(documentsDir, category, `${slug}.md`)

        if (!fs.existsSync(markdownPath)) {
          missingFiles.push(fullSlug)
        }
      })
    })

    if (missingFiles.length > 0) {
      throw new Error(
        `Relationships reference missing markdown files:\n${missingFiles.map(f => `  - ${f}`).join('\n')}`
      )
    }
  })
})
