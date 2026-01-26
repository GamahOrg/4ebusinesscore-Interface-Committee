import { FC } from 'react'
import { useIntl } from 'react-intl'

const Error404: FC = () => {
  const intl = useIntl()

  return (
    <>
      <h1 className='fw-bolder fs-4x text-gray-300 mb-5'> {intl.formatMessage({ id: "PageNotFound" })}</h1>

      <div className='fw-bold fs-3 text-gray-300 mb-15'>
        {intl.formatMessage({ id: "PageNotFoundDetails" })}
      </div>
    </>
  )
}

export {Error404}
