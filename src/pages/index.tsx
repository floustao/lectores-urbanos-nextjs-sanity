import { Grid, Heading, Stack } from '@chakra-ui/react'
import type { GetStaticProps, InferGetStaticPropsType } from 'next'
import { useLiveQuery } from 'next-sanity/preview'

import CompanyCard from '~/components/CompanyCard'
import { Layout } from '~/components/Layout'
import Welcome from '~/components/Welcome'
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
      {companies.length ? (
        <Stack>
          <Heading as="h1" size="sm">
            Descubre las companias que apoyan el proyecto
          </Heading>
          <Grid
            gap="4"
            gridTemplateColumns="repeat(auto-fit, minmax(200px, 1fr))"
          >
            {companies.map((company) => (
              <CompanyCard key={company._id} company={company} />
            ))}
          </Grid>
        </Stack>
      ) : (
        <Welcome />
      )}
    </Layout>
  )
}
