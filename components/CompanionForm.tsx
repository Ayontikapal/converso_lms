"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm, Controller } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Field, FieldError } from "@/components/ui/field"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { subjects } from "@/constants"
import {createCompanion} from "@/lib/actions/companion.actions";
import { redirect } from "next/navigation"

const formSchema = z.object({
    name: z.string().min(1, { message: 'Companion is required.' }),
    subject: z.string().min(1, { message: 'Subject is required.' }),
    topic: z.string().min(1, { message: 'Topic is required.' }),
    voice: z.string().min(1, { message: 'Voice is required.' }),
    style: z.string().min(1, { message: 'Style is required.' }),
    duration: z.coerce.number().min(1, { message: 'Duration is required.' }),
})

const CompanionForm = () => {
    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: '',
            subject: '',
            topic: '',
            voice: '',
            style: '',
            duration: 15,
        },
    })

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        const companion = await createCompanion(values);

        if(companion){
            redirect(`/companions/${companion.id}`);
        }
        else{
            console.log('Failed to create companion');
            redirect('/');
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            <Field data-invalid={!!errors.name}>
                <Label>Companion name</Label>
                <Input
                    placeholder="Enter the companion name"
                    {...register("name")}
                    className="input"
                />
                <FieldError>{errors.name?.message}</FieldError>
            </Field>

            {/* Subject */}
            <Field data-invalid={!!errors.subject}>
                <Label>Subject</Label>
                <Controller
                    control={control}
                    name="subject"
                    render={({ field }) => (
                        <Select onValueChange={field.onChange} value={field.value}>
                            <SelectTrigger className="input capitalize">
                                <SelectValue placeholder="Select the subject" />
                            </SelectTrigger>
                            <SelectContent>
                                {subjects.map((subject) => (
                                    <SelectItem
                                        value={subject}
                                        key={subject}
                                        className="capitalize"
                                    >
                                        {subject}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    )}
                />
                <FieldError>{errors.subject?.message}</FieldError>
            </Field>

            {/* Topic */}
            <Field data-invalid={!!errors.topic}>
                <Label>What should the companion help with?</Label>
                <Textarea
                    placeholder="Ex. Derivatives & Integrals"
                    {...register("topic")}
                    className="input"
                />
                <FieldError>{errors.topic?.message}</FieldError>
            </Field>

            {/* Voice */}
            <Field data-invalid={!!errors.voice}>
                <Label>Voice</Label>
                <Controller
                    control={control}
                    name="voice"
                    render={({ field }) => (
                        <Select onValueChange={field.onChange} value={field.value}>
                            <SelectTrigger className="input">
                                <SelectValue placeholder="Select the voice" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="male">Male</SelectItem>
                                <SelectItem value="female">Female</SelectItem>
                            </SelectContent>
                        </Select>
                    )}
                />
                <FieldError>{errors.voice?.message}</FieldError>
            </Field>

            {/* Style */}
            <Field data-invalid={!!errors.style}>
                <Label>Style</Label>
                <Controller
                    control={control}
                    name="style"
                    render={({ field }) => (
                        <Select onValueChange={field.onChange} value={field.value}>
                            <SelectTrigger className="input">
                                <SelectValue placeholder="Select the style" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="formal">Formal</SelectItem>
                                <SelectItem value="casual">Casual</SelectItem>
                            </SelectContent>
                        </Select>
                    )}
                />
                <FieldError>{errors.style?.message}</FieldError>
            </Field>
            <Field data-invalid={!!errors.duration}>
                <Label>Estimated session duration in minutes</Label>
                <Input
                    type="number"
                    placeholder="15"
                    {...register("duration")}
                    className="input"
                />
                <FieldError>{errors.duration?.message}</FieldError>
            </Field>

            <Button type="submit" className="w-full cursor-pointer mb-5">
                Build Your Companion
            </Button>
        </form>
    )
}

export default CompanionForm