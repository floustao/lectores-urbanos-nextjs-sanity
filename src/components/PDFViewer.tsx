import 'react-pdf/dist/Page/AnnotationLayer.css'
import 'react-pdf/dist/Page/TextLayer.css'

import { Button, Flex, HStack, Stack, Text, useToast } from '@chakra-ui/react'
import type { PDFDocumentProxy } from 'pdfjs-dist'
import * as React from 'react'
import { Document, Page, pdfjs } from 'react-pdf'

import useResizeObserver from '~/hooks/useResizeObserver'

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.js',
  import.meta.url,
).toString()

const options = {
  cMapUrl: `https://unpkg.com/pdfjs-dist@${pdfjs.version}/cmaps/`,
}

const resizeObserverOptions = {}

const maxWidth = 800

export default function PDFViewer({ file }: { file: string }) {
  const [numPages, setNumPages] = React.useState<number>(null)
  const [pageNumber, setPageNumber] = React.useState(1)
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
    setPageNumber(1)
  }

  function changePage(offset) {
    setPageNumber((prevPageNumber) => prevPageNumber + offset)
  }

  function previousPage() {
    changePage(-1)
  }

  function nextPage() {
    changePage(1)
  }

  return (
    <Stack w="full">
      <Flex ref={setContainerRef} justify="center">
        <Document
          file={file}
          onLoadSuccess={onDocumentLoadSuccess}
          options={options}
        >
          <Page
            pageNumber={pageNumber}
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
        </Document>
      </Flex>

      <Stack spacing="2" align="center" p="4">
        <Text>
          Page {pageNumber || (numPages ? 1 : '--')} of {numPages || '--'}
        </Text>
        <HStack>
          <Button isDisabled={pageNumber <= 1} onClick={previousPage}>
            Previous
          </Button>
          <Button isDisabled={pageNumber >= numPages} onClick={nextPage}>
            Next
          </Button>
        </HStack>
      </Stack>
    </Stack>
  )
}
