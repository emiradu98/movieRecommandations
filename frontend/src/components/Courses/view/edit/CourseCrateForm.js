import React from 'react'
import {BoxContent, BoxHeader, BoxWrapper, HeaderWithIcon} from '../../../Global/Box/styles/box'
import {BigPGreyBold, Label} from '../../../../styles/typography/typography'
import {
    DualBoxWrapper,
    FormItem,
    StaffFormFooter,
    StaffFormWrapper
} from '../../../../styles/shared/form'
import {Field, Form} from 'react-final-form'
import {FieldInput} from '../../../Global/Input/FieldInput'
import {FieldSelect} from '../../../Global/Select/FieldSelect'
import {SecondaryButton} from '../../../../styles/shared/button'
import {FILE_ICON} from '../../../../styles/abstract/variables'
import 'react-html5-camera-photo/build/css/index.css'

export default function CourseCrateForm({onSubmit, teachers, type}) {
    return (
        <Form
            onSubmit={onSubmit}
            validate={({name}) => {
                const errors = {}
                if (!name) {
                    errors.name = 'Insert course name'
                } else {
                    if (name.length < 5) {
                        errors.name = 'Course name should be >5'
                    }
                }
                return errors
            }}
            render={({handleSubmit, pristine, invalid}) => (
                <form onSubmit={handleSubmit}>
                    <StaffFormWrapper>
                        <DualBoxWrapper web={type === 'web'}>
                            <BoxWrapper web={type === 'web'} large={type === 'web'}>
                                <BoxHeader>
                                    <HeaderWithIcon flex>
                                        <i className={FILE_ICON}/>
                                        <BigPGreyBold>Create course</BigPGreyBold>
                                    </HeaderWithIcon>
                                </BoxHeader>
                                <BoxContent>
                                    <FormItem>
                                        <Label>Course name</Label>
                                        <Field component={FieldInput} name='name' placeholder={'Type course name'}/>
                                    </FormItem>
                                    <FormItem>
                                        <Label>Teacher</Label>
                                        <Field component={FieldSelect} options={teachers} name='user_id'
                                               placeholder={'Select teacher'}/>
                                    </FormItem>
                                </BoxContent>
                            </BoxWrapper>
                            
                        </DualBoxWrapper>
                        <StaffFormFooter>
                            <FormItem style={{width: 'fit-content'}}>
                                <SecondaryButton filled type={'submit'}
                                                 disabled={pristine || invalid}>Create</SecondaryButton>
                            </FormItem>
                        </StaffFormFooter>
                    </StaffFormWrapper>
                </form>

            )}
        />
    )
}
