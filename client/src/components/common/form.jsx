import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Textarea } from '../ui/textarea'
import { Button } from '../ui/button'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '../ui/select'

function Commonform({ isBtnDisabled,formControls, formData, setFormData, onSubmit, buttomText }) {

    console.log("common form : ",formData)

    const renderInputComponents = (getControlItem) => {
        let element = null
        let value = formData[getControlItem.name] || ''
        switch (getControlItem.componentType) {
            case 'input':
                element = <Input onChange={
                    (e) => {
                        setFormData({ ...formData, [getControlItem.name]: e.target.value })
                    }
                } value={value} name={getControlItem.name} type={getControlItem.type} placeholder={getControlItem.placeholder} id={getControlItem.name} />
                break;

            case 'select':
                element = (<Select
                    onValueChange={
                        (value) => {
                            setFormData({ ...formData, [getControlItem.name]: value })
                        }
                    } value={value}>
                    <SelectTrigger className="w-full" >
                        <SelectValue placeholder={getControlItem.label} />
                    </SelectTrigger>
                    <SelectContent>
                        {
                            getControlItem.options && getControlItem?.options.length > 0 ? getControlItem.options.map(optionItem => <SelectItem key={optionItem.id} value={optionItem.id}>{optionItem.label}</SelectItem>) : null
                        }
                    </SelectContent>
                </Select>)
                break;

            case 'textarea':
                element = (<Textarea onChange={
                    (e) => {
                        setFormData({ ...formData, [getControlItem.name]: e.target.value })
                    }
                } value={value} name={getControlItem.name} placeholder={getControlItem.placeholder} id={getControlItem.id} />)
                break;

            default:
                element = <Input onChange={
                    (e) => {
                        setFormData({ ...formData, [getControlItem.name]: e.target.value })
                    }
                } value={value} name={getControlItem.name} type={getControlItem.type} placeholder={getControlItem.placeholder} id={getControlItem.name} />
                break;
        }
        return element
    }

    return (
        <form onSubmit={onSubmit}>
            <div className="flex flex-col gap-3">
                {
                    formControls.map(controlItem => {
                        return (<div className="w-full grid gap-1.5" key={controlItem.name}>
                            <Label className="mb-1">{controlItem.label}</Label>
                            {renderInputComponents(controlItem)}
                        </div>)
                    })
                }
            </div>
            <Button disabled={isBtnDisabled} type='submit' className="mt-2 w-full">{buttomText || 'Submit'}</Button>
        </form>
    )
}

export default Commonform
