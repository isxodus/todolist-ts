import React from 'react';
import {UniversalInputArea, UniversalInputAreaPropsType} from "./UniversalInputArea";
import {action} from "@storybook/addon-actions";
import {Story} from "@storybook/react";
import {Box, Grid, Paper, Typography} from "@mui/material";

export default {
    title: "Universal Components/UniversalInputArea",
    component: UniversalInputArea,
}
const actionCallback = action('onEntityCallback was called')
const cancelCallback = action('cancelCallback was called')
const onBlurCallback = action('onBlurCallback was called')


export const BasicScenario = () => <div>
    <Box padding={2}>
        <Typography variant="h3" gutterBottom component="div" padding={1}>
            UniversalInputArea
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
            A universal area with buttons, that could take only two parameters:
            <ul>
                <li>type : 'textarea' | 'input'</li>
                <li>onEntityFunction: (newText: string) {'=>'} void</li>
            </ul>
            However, there are plenty of optional ones to fullfill different needs. This Component is used in other Universal Components
        </Typography>
        <Grid container>
            <Grid item xs={6} paddingRight={1}>
                <Paper elevation={3}>
                    <Box padding={1}>
                        <Typography variant="h6" gutterBottom component="div" padding={1}>
                            This is a default INPUT area
                        </Typography>
                        <Typography variant="body1" gutterBottom>
                            <div>For Textarea Enter and Ctrl+Enter are available by default</div>
                        </Typography>
                        <UniversalInputArea type={'input'} onEntityFunction={actionCallback}/>
                    </Box>
                </Paper>
            </Grid>
            <Grid item xs={6} paddingLeft={1}>
                <Paper elevation={3}>
                    <Box padding={1}>
                        <Typography variant="h6" gutterBottom component="div" padding={1}>
                            This is a default TEXTEAREA area
                        </Typography>
                        <Typography variant="body1" gutterBottom>
                            <div>For Textarea Enter is not available by default, only Ctrl+Enter</div>
                            <div>Height is 3 rows by default (match 2 buttons height)</div>
                            <div>Height could extend up to 4 rows by default</div>
                        </Typography>
                        <UniversalInputArea type={'textarea'} onEntityFunction={actionCallback}/>
                    </Box>
                </Paper>
            </Grid>
        </Grid>
    </Box>
</div>

export const PlaygroundForInputMer = () => <div>
    <div className="mermaid">
        {`graph TD
            A[Client] --> B[Load Balancer]
            B --> C[Server01]
            B --> D[Server02]`}
    </div>
</div>

export const PlaygroundForInputTODO = () => <div>
    <Grid item xs={6} paddingRight={1} marginTop={1}>
        <Paper elevation={3}>
            <Box padding={1}>
                <Typography variant="h6" gutterBottom component="div" padding={1}>
                    This is an INPUT area with cancel btn
                </Typography>
                <Typography variant="body1" gutterBottom>
                    By default - cancel button returns initial text
                </Typography>
                <UniversalInputArea type={'input'} onEntityFunction={actionCallback} initText={'init text'} showCancelButton={true}/>
            </Box>
        </Paper>
    </Grid>
    <Grid item xs={6} paddingLeft={1} marginTop={1}>
        <Paper elevation={3}>
            <Box padding={1}>
                <Typography variant="h6" gutterBottom component="div" padding={1}>
                    This is a TEXTEAREA area with cancel btn
                </Typography>
                <Typography variant="body1" gutterBottom>
                    By default - cancel button returns initial text
                </Typography>
                <UniversalInputArea type={'textarea'} onEntityFunction={actionCallback} initText={'init text'} showCancelButton={true}/>
            </Box>
        </Paper>
    </Grid>

    <UniversalInputArea type={'input'} onEntityFunction={actionCallback}/>
    <UniversalInputArea type={'textarea'} onEntityFunction={actionCallback} addButtonText={"A"} showCancelButton={true}/>
    <UniversalInputArea type={'input'} onEntityFunction={actionCallback} onBlurFunction={() => alert(1)}
                        showCancelButton={true}

                        addButtonText={"A"}/>

</div>

//PLAYGROUND ELEMENT
const Template: Story<UniversalInputAreaPropsType> = (args) => <UniversalInputArea {...args}/>
export const TemplateInputArea = Template.bind({})
TemplateInputArea.args = {
    type: 'input',
    onEntityFunction: actionCallback,
}