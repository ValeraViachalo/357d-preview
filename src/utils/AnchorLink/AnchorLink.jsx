"use client"
import { ScrollContext } from '@/lib/providers/ScrollProvider/context'
import { ScrollProvider } from '@/lib/providers/ScrollProvider/ScrollProvider'
import Link from 'next/link'
import React, { useContext } from 'react'

export const AnchorLink = ({ children, toSection, ...rest }) => {
  return (
    <ScrollProvider>
      <LinkWrapper {...rest} toSection={toSection}>
        {children}
      </LinkWrapper>
    </ScrollProvider>
  )
}

const LinkWrapper = ({ children, toSection, ...rest }) => {
  const { scrollTo } = useContext(ScrollContext);

  const handlerScrollTo = (e) => {
    e.preventDefault();
    scrollTo(toSection);
  }

  return (
    <Link href={toSection} onClick={handlerScrollTo} {...rest}>
      {children}
    </Link>
  )
}