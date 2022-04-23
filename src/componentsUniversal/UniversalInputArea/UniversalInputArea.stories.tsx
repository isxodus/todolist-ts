import React from 'react';
import {UniversalInputArea, UniversalInputAreaPropsType} from "./UniversalInputArea";
import {action} from "@storybook/addon-actions";
import {Story} from "@storybook/react";

export default {
    title: "UniversalInputArea",
    component: UniversalInputArea,
}

const Template: Story<UniversalInputAreaPropsType> = (args) => <UniversalInputArea {...args}/>
const actionCallback = action('onEntityFunction was called')
const onBlurCallback = action('onEntityFunction was called')

//for some reason you dont get undefined for ? attrs
export const DefaultAreas = Template.bind({})
DefaultAreas.args = {
    type: 'input',
    onEntityFunction: actionCallback,
    // onBlurFunction: undefined
}


//action callback does not work
export const DefaultInput2 = () => <div>
    <UniversalInputArea type={'input'} onEntityFunction={actionCallback}/>

</div>


export const DefaultInput = () => <div><UniversalInputArea type={'input'} onEntityFunction={actionCallback}/>
    <UniversalInputArea type={'textarea'} onEntityFunction={actionCallback} addButtonText={"A"}/>
    <UniversalInputArea type={'input'} onEntityFunction={actionCallback} onBlurFunction={() => alert(1)}
                        showCancelButton={true}

                        addButtonText={"A"}/>

</div>