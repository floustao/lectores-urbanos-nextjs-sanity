import { Link } from '@chakra-ui/next-js'
import { Heading, Image, Stack, Text } from '@chakra-ui/react'

import { Card } from '~/imports/chakra/components/Card'
import { ImageFallback } from '~/imports/chakra/components/ImageFallback'
import { urlForImage } from '~/lib/sanity.image'
import { type Company } from '~/lib/sanity.queries'

export default function CompanyCard({ company }: { company: Company }) {
  return (
    <Card display="flex" p="4" flexDirection={['column', 'row']}>
      {company.mainImage ? (
        <Image
          loading="lazy"
          src={urlForImage(company.mainImage).url()}
          height="auto"
          width={['full', '180px']}
          objectFit="contain"
          alt={company.title}
          fallback={
            <ImageFallback w={['full', '200px']} h={['auto', '150px']} />
          }
        />
      ) : (
        <div className="card__cover--none" />
      )}
      <Stack m="4" spacing="1">
        <Heading size="md" noOfLines={2}>
          <Link href={`/company/${company.slug.current}`}>{company.title}</Link>
        </Heading>
        <Text></Text>
      </Stack>
    </Card>
  )
}
