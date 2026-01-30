import { useEffect, useState } from 'react'

type ReviewsImportTablePreviewProps = {
  file: File
}

export function ReviewsImportTablePreview({
  file,
}: ReviewsImportTablePreviewProps) {
  const [headers, setHeaders] = useState<string[]>([])
  const [rows, setRows] = useState<string[][]>([])

  useEffect(() => {
    const load = async () => {
      const text = await file.text()
      const lines = text.split('\n').map((l) => l.split(','))
      setHeaders(lines[0] || [])
      setRows(lines.slice(1, 4))
    }

    load()
  }, [file])

  if (!headers.length) return null

  return (
    <div className='space-y-2'>
      <p className='text-sm font-medium'>Pré-visualização</p>

      <div className='relative -mx-1'>
        <div className='overflow-x-auto rounded-md border'>
          <table className='w-full min-w-max text-xs'>
            <thead className='bg-muted'>
              <tr>
                {headers.map((header) => (
                  <th
                    key={header}
                    className='border-b px-2 py-1 text-left font-medium whitespace-nowrap'
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row, i) => (
                <tr key={i} className='border-b last:border-b-0'>
                  {row.map((cell, j) => (
                    <td
                      key={j}
                      className='max-w-[160px] truncate px-2 py-1 whitespace-nowrap'
                    >
                      {cell || '-'}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
