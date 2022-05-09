import React from 'react';
import {action} from "@storybook/addon-actions";
import {Story} from "@storybook/react";
import {UniversalEditableSpan as UES, UniversalEditableSpanPropsType} from "./UniversalEditableSpan";

export default {
    title: "Universal Components/UniversalEditableSpan",
    component: UES,
}
const actionCallback = action('onEntityCallback was called')
const cancelCallback = action('cancelCallback was called')
const onBlurCallback = action('onBlurCallback was called')


//PLAYGROUND ELEMENT
const Template: Story<UniversalEditableSpanPropsType> = (args) => <UES {...args}/>
export const TemplateInputArea = Template.bind({})
TemplateInputArea.args = {
    text: 'Playground element',
    onEntityFunction: actionCallback,
}