import Layout from '@/components/Layout'
import { NextPageWithLayout } from 'pages/_app'
import React, { ReactElement } from 'react'

const Page:NextPageWithLayout = () => {
  return (
    <div>userId</div>
  )
}

Page.getLayout = function getLayout(page: ReactElement){
  return(
    <Layout>
      {page}
    </Layout>
  )
}

export default Page