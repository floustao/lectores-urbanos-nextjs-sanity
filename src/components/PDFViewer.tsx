import 'react-pdf/dist/Page/AnnotationLayer.css'
import 'react-pdf/dist/Page/TextLayer.css'

import { Button, Flex, HStack, Stack, Text, useToast } from '@chakra-ui/react'
import type { PDFDocumentProxy } from 'pdfjs-dist'
import * as React from 'react'
import { Document, Page, pdfjs } from 'react-pdf'

import useResizeObserver from '~/hooks/useResizeObserver'

// Configure PDF.js worker
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.js',
  import.meta.url,
).toString()

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

  const onDocumentLoadSuccess = ({
    numPages: nextNumPages,
  }: PDFDocumentProxy): void => {
    setNumPages(nextNumPages)
    setPageNumber(1)
  }

  const changePage = (offset: number) => {
    setPageNumber((prevPageNumber) => prevPageNumber + offset)
  }

  const previousPage = () => {
    changePage(-1)
  }

  const nextPage = () => {
    changePage(1)
  }

  return (
    <Stack w="full">
      <Flex ref={setContainerRef} justify="center">
        <Document file={file} onLoadSuccess={onDocumentLoadSuccess}>
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
          Página {pageNumber || (numPages ? 1 : '--')} de {numPages || '--'}
        </Text>
        <HStack>
          <Button
            isDisabled={pageNumber <= 1}
            onClick={(e) => {
              e.preventDefault()
              previousPage()
            }}
          >
            Anterior
          </Button>
          <Button
            isDisabled={pageNumber >= numPages}
            onClick={(e) => {
              e.preventDefault()
              nextPage()
            }}
          >
            Siguiente
          </Button>
        </HStack>
      </Stack>
    </Stack>
  )
}
