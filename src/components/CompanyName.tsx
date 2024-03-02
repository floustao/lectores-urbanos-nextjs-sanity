import { Link } from '@chakra-ui/next-js'
import * as React from 'react'

import { type Company } from '~/lib/sanity.queries'

export const CompanyName: React.FC<{ company: Company }> = ({ company }) => {
  if (company?.url) {
    return (
      <Link href={company.url} isExternal>
        {company.title}
      </Link>
    )
  } else {
    return <b>{company.title}</b>
  }
}
