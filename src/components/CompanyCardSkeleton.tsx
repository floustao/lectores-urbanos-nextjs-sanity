import { Skeleton, SkeletonText, Text } from '@chakra-ui/react'
import * as React from 'react'

import { CustomCard } from '~/imports/chakra/components/CustomCard'

export const CompanyCardSkeleton: React.FC = () => {
  return (
    <CustomCard
      display="flex"
      p="4"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
    >
      <Skeleton width={180} height={180} />

      <SkeletonText
        mt="4"
        w="200px"
        noOfLines={2}
        spacing="4"
        skeletonHeight="2"
      />
    </CustomCard>
  )
}
