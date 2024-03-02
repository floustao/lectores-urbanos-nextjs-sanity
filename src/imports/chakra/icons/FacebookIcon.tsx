import { Icon, IconProps } from '@chakra-ui/react'
import * as React from 'react'

export const FacebookIcon: React.FC<IconProps> = ({ ...props }) => {
  return (
    <Icon width="1em" height="1em" viewBox="0 0 512 512" {...props}>
      <svg
        data-name="Layer 1"
        id="Layer_1"
        viewBox="0 0 512 512"
        xmlns="http://www.w3.org/2000/svg"
      >
        <title />
        <path d="M256,0C114.615,0,0,114.615,0,256S114.615,512,256,512,512,397.385,512,256,397.385,0,256,0Zm67.59,153.428s-26.194-2.064-36.513,1.746c-17.056,6.3-17.462,21.034-17.462,35.084v28.694h52.149l-7.62,54.888H269.615V409.333h-58.9V273.84H161.744V218.952h48.974V172.4c0-49.292,37.942-67.151,60.563-69.294s52.309,4.286,52.309,4.286Z" />
      </svg>
    </Icon>
  )
}