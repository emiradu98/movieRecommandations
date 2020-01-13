import React from 'react'
import Paginator from '../../Global/Paginator/Paginator'
import { PageContent } from '../../../styles/shared/wrapper'
import _ from 'lodash'
import moment from 'moment-timezone'
import { DATETIME_FORMAT } from '../../../config/constants'
import Table from '../../Global/Table/Table'
import { PLAYERS_LISTING_HEADERS } from './PlayersListing'
import FiltersWeb from '../../Global/Filter/FiltersWeb'
import { Loader } from '../../Global/InfiniteScroll'
import EmptyData from '../../Global/EmptyData/EmptyData'

export default function PlayersListingWeb ({ role, players, pagination, handlePagination, direction, orderBy, handleSort, fields, match, filters, filterFields, removeFilter, handleFilter, loading }) {
  const widthPercents = ['20', '20', '15', '10', '15', '10', '10']
  const data = []

  _.map(players, (item) => {
    const row = {
      id: item.id,
      name: { text: `${item.firstName} ${item.lastName}`, url: item.profileImage && item.profileImage.url },
      email: item.email,
      country: {
        flag: item.country && item.country.name,
        flagCode: item.country && item.country.code
      },
      hasId: item.identityImage,
      tournaments: item.playersCount,
      since: moment(item.createdAt).format(DATETIME_FORMAT),
      wins: item.prizesCount,
      'buy-in': item.totalBuyIn,
      link: role === 'register' ? '' : `/players/${item.id}`
    }
    data.push(row)
  })
  return (
    <PageContent type='web'>
      <FiltersWeb
        filterFields={filterFields}
        filters={filters}
        removeFilter={removeFilter}
        handleFilter={handleFilter}
      />
      {

        _.size(players) !== 0 && !loading &&
          <>
            <Table
              match={match}
              headers={PLAYERS_LISTING_HEADERS}
              data={data}
              widthPercents={widthPercents}
              direction={direction}
              orderBy={orderBy}
              handleSort={handleSort}
            />
            {pagination.pageCount > 1 && <Paginator pagination={pagination} handlePagination={handlePagination} />}
          </>
      }
      {
        loading && <Loader />
      }
      {
        !loading && _.size(players) === 0 && <EmptyData data='No players atm.' />
      }
    </PageContent>
  )
}