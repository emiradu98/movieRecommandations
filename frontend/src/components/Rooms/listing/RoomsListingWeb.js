import React from 'react'
import {PageContent, PageWrapperLeft} from '../../../styles/shared/wrapper'
import {withRouter} from 'react-router-dom'
import EmptyData from '../../Global/EmptyData/EmptyData'
import {Loader} from '../../Global/InfiniteScroll'
import Masonry from "react-masonry-component";
import Box from "../../Global/Box/Box";

function RoomsListingWeb({rooms, loading}) {
    return (
        <PageContent type='web' flex>
            <PageWrapperLeft tournamentListing>
                <Masonry>
                    {
                        !rooms || rooms.length === 0 &&
                        <EmptyData data={'There aren\'t any rooms.'}/>
                    }
                    {
                        rooms && rooms.length !== 0 && rooms.map((room, index) =>
                            <Box
                                status
                                header={{
                                    title: [room.number],
                                    // subTitle: [_.startCase(staff.role)]
                                }}
                                expand={{
                                    capacity: room.capacity,
                                    features: room.features
                                }}


                                link={{url: `/rooms/edit/${room.id}`, text: 'EDIT'}}
                            />
                        )
                    }
                    {
                        loading && <Loader/>
                    }
                </Masonry>
            </PageWrapperLeft>
        </PageContent>
    )
}

export default withRouter(RoomsListingWeb)
