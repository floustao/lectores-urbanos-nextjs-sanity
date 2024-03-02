import {
  Grid,
  Heading,
  Skeleton,
  SkeletonText,
  Stack,
  Text,
} from '@chakra-ui/react'
import type { GetStaticProps, InferGetStaticPropsType } from 'next'
import { useLiveQuery } from 'next-sanity/preview'

import CompanyCard from '~/components/CompanyCard'
import { CompanyCardSkeleton } from '~/components/CompanyCardSkeleton'
import { Layout } from '~/components/Layout'
import { CustomCard } from '~/imports/chakra/components/CustomCard'
import { readToken } from '~/lib/sanity.api'
import { getClient } from '~/lib/sanity.client'
import {
  companiesQuery,
  type Company,
  getCompanies,
} from '~/lib/sanity.queries'
import type { SharedPageProps } from '~/pages/_app'

export const getStaticProps: GetStaticProps<
  SharedPageProps & {
    companies: Company[]
  }
> = async ({ draftMode = false }) => {
  const client = getClient(draftMode ? { token: readToken } : undefined)
  const companies = await getCompanies(client)

  return {
    props: {
      draftMode,
      token: draftMode ? readToken : '',
      companies,
    },
  }
}

export default function IndexPage(
  props: InferGetStaticPropsType<typeof getStaticProps>,
) {
  const [companies] = useLiveQuery<Company[]>(props.companies, companiesQuery)
  return (
    <Layout>
      <Stack spacing="8">
        <Heading as="h1" size="sm">
          Descubre las companias que apoyan el proyecto
        </Heading>
        {companies.length ? (
          <Grid
            gap="4"
            gridTemplateColumns="repeat(auto-fit, minmax(200px, 1fr))"
          >
            {companies.map((company) => (
              <CompanyCard key={company._id} company={company} />
            ))}
          </Grid>
        ) : (
          <Grid
            gap="4"
            gridTemplateColumns="repeat(auto-fit, minmax(200px, 1fr))"
          >
            <CompanyCardSkeleton />
            <CompanyCardSkeleton />
            <CompanyCardSkeleton />
            <CompanyCardSkeleton />
            <CompanyCardSkeleton />
          </Grid>
        )}
      </Stack>
    </Layout>
  )
}
