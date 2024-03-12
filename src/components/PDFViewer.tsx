import 'react-pdf/dist/Page/AnnotationLayer.css'
import 'react-pdf/dist/Page/TextLayer.css'

import { Flex, useToast } from '@chakra-ui/react'
import type { PDFDocumentProxy } from 'pdfjs-dist'
import * as React from 'react'
import { Document, Page, pdfjs } from 'react-pdf'

import useResizeObserver from '~/hooks/useResizeObserver'

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.js',
  import.meta.url,
).toString()

const resizeObserverOptions = {}

const maxWidth = 800

export default function PDFViewer({ file }: { file: string }) {
  const [numPages, setNumPages] = React.useState<number>()
  const [containerRef, setContainerRef] = React.useState<HTMLElement | null>(
    null,
  )
  const [containerWidth, setContainerWidth] = React.useState<number>()
  const toast = useToast()

  const onResize = React.useCallback<ResizeObserverCallback>((entries) => {
    const [entry] = entries

    if (entry) {
      setContainerWidth(entry.contentRect.width)
    }
  }, [])

  useResizeObserver(containerRef, resizeObserverOptions, onResize)

  function onDocumentLoadSuccess({
    numPages: nextNumPages,
  }: PDFDocumentProxy): void {
    setNumPages(nextNumPages)
  }

  return (
    <Flex ref={setContainerRef} w="full" justify="center">
      <Document file={file} onLoadSuccess={onDocumentLoadSuccess}>
        {Array.from(new Array(numPages), (el, index) => (
          <Page
            key={`page_${index + 1}`}
            pageNumber={index + 1}
            width={
              containerWidth ? Math.min(containerWidth, maxWidth) : maxWidth
            }
            onLoadError={(error) =>
              toast({
                status: 'error',
                description: `Error while loading page! ${error.message}`,
              })
            }
          />
        ))}
      </Document>
    </Flex>
  )
}
