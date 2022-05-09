import React, {useState} from 'react';
import {action} from "@storybook/addon-actions";
import {Story} from "@storybook/react";
import {UniversalCheckbox, UniversalCheckboxPropsType} from "./UniversalCheckbox";

export default {
    title: "Universal Components/UniversalCheckbox",
    component: UniversalCheckbox,
}


const cancelCallback = action('cancelCallback was called')
const onBlurCallback = action('onBlurCallback was called')

export const PlaygroundForInputMer = () => {
    const [checked, setChecked] = useState(false)
    const actionCallback = () => {
        setChecked(!checked)
        action('onEntityCallback was called')
    }
    return <div>
        <UniversalCheckbox checked={checked} handler={actionCallback}/>
    </div>
}

//PLAYGROUND ELEMENT
const Template: Story<UniversalCheckboxPropsType> = (args) => <UniversalCheckbox {...args}/>
export const TemplateInputArea = Template.bind({})
TemplateInputArea.args = {
    checked: true,
    handler: action('onEntityCallback was called'),
}