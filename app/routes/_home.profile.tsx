import { useEffect, useRef, useState } from 'react';
import { ActionFunctionArgs, json, type MetaFunction } from '@remix-run/node';
import { HiPencil } from 'react-icons/hi2';
import {
  Form,
  useActionData,
  useOutletContext,
  useNavigate,
} from '@remix-run/react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Bounce, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { User } from '~/interfaces';
import { Button, EditableProfileField } from '~/components';
import Chips from '~/components/search/Chips';
import {
  cuisineOptions,
  dietOptions,
} from '~/components/search/Filters/constants';
import prisma from '../../prisma/index';

export const meta: MetaFunction = () => {
  return [
    { title: 'Profile - Recipe Mania' },
    { name: 'description', content: 'Welcome to Recipe Mania!' },
  ];
};

const schema = z.object({
  name: z
    .string()
    .min(1, 'Name is required')
    .max(20, 'Please enter a name within 20 characters.'),
  email: z.string().email('Invalid email format').min(1, 'Email is required'),
  preferred_cuisine: z.string(),
  dietary_preferences: z.string(),
});

type ProfileData = z.infer<typeof schema>;

export default function Profile() {
  // fetching user profile from layout
  const [user] = useOutletContext<[User | null]>();
  const actionData = useActionData<{
    error?: string;
    success?: boolean;
    message?: string;
  }>();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProfileData>({
    resolver: zodResolver(schema),
  });

  const [editMode, setEditMode] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [resetForm, setResetForm] = useState<number>(0);
  const [selectedDiets, setSelectedDiets] = useState<string[]>(
    user?.dietary_preferences || [],
  );
  const [selectedCuisines, setSelectedCuisines] = useState<string[]>(
    user?.preferred_cuisine || [],
  );

  const navigate = useNavigate();

  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (!actionData) return;
    if (actionData.error) {
      toast.error(actionData.error, {
        position: 'top-right',
        autoClose: 5000,
        pauseOnHover: true,
        transition: Bounce,
      });
    } else {
      toast.success(actionData.message, {
        position: 'top-right',
        autoClose: 5000,
        pauseOnHover: true,
        transition: Bounce,
      });
    }
  }, [actionData]);

  const onSubmit: SubmitHandler<ProfileData> = () => {
    setLoading(true);
    formRef.current?.submit();
  };

  const handleCancelEdit = () => {
    setEditMode(false);
    setResetForm(resetForm + 1);
  };

  if (!user) {
    navigate('/');
    return;
  }

  return (
    <div className="flex flex-col gap-16 px-8 py-32 sm:px-32 md:px-64 lg:px-96">
      <div
        data-testid="user-profile"
        className="relative flex items-center justify-start gap-4"
      >
        <div className="absolute right-0">
          <Button
            buttonText={
              <div className="flex items-center gap-2">
                <HiPencil fontSize={12} />
                Edit
              </div>
            }
            type="secondary"
            className="self-end px-1 py-1 text-sm"
            onClick={() => setEditMode(true)}
            disabled={editMode}
          />
        </div>
        <div className="rounded-full border-2 border-primary-500 p-1">
          <div className="relative h-20 w-20 overflow-hidden rounded-full">
            <img
              src="/images/default-profile-pic.png"
              alt=""
              className="absolute left-0 top-0 bg-cover"
            />
          </div>
        </div>
        <div className="flex-center gap-4">
          <div className="flex flex-col">
            <p className="text-2xl font-medium opacity-75">
              {user.first_name} {user.last_name}
            </p>
            <p className="text-lg font-light text-[#9E634E] opacity-60">
              Recipier
            </p>
          </div>
        </div>
      </div>
      <Form
        className="flex flex-col gap-8 px-2"
        onSubmit={handleSubmit(onSubmit)}
        method="post"
        action="/profile"
        ref={formRef}
        key={resetForm}
      >
        <EditableProfileField
          editMode={editMode}
          label={'Name'}
          value={`${user.first_name} ${user.last_name}`}
          register={register}
          name={'name'}
          error={errors.name?.message as string}
        />
        <EditableProfileField
          editMode={editMode}
          label={'Email'}
          register={register}
          error={errors.email?.message as string}
          name={'email'}
          value={user.email}
        />

        <div className="flex items-center justify-between">
          <p className="opacity-55">Preferred Cuisines</p>
          <Chips
            icon={false}
            disabled={!editMode}
            iconPath="meals/"
            options={cuisineOptions}
            page="profile"
            preSelected={user.preferred_cuisine || []}
            onChange={(selectedOptions) => setSelectedCuisines(selectedOptions)}
          />
          <input
            type="hidden"
            {...register('preferred_cuisine')}
            value={selectedCuisines}
          />
        </div>

        <div className="flex items-center justify-between gap-4">
          <p className="opacity-55">Dietry Preferences</p>
          <Chips
            icon={false}
            disabled={!editMode}
            iconPath="meals/"
            options={dietOptions}
            preSelected={user.dietary_preferences || []}
            page="profile"
            onChange={(selectedOptions) => setSelectedDiets(selectedOptions)}
          />
          <input
            type="hidden"
            value={selectedDiets}
            {...register('dietary_preferences')}
          />
        </div>
        {editMode ? (
          <div className="mt-4 flex gap-2 self-end">
            <Button
              buttonText="Cancel"
              type="secondary"
              className="text-sm"
              onClick={handleCancelEdit}
              disabled={loading}
            />
            <Button
              buttonText="Save"
              className="text-sm"
              submit={true}
              loading={loading}
            />
          </div>
        ) : null}
      </Form>
    </div>
  );
}

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const name = String(formData.get('name'));
  const email = String(formData.get('email'));
  const dietary_preferences = String(formData.get('dietary_preferences'));
  const preferred_cuisine = String(formData.get('preferred_cuisine'));

  try {
    await prisma.user.update({
      where: { email: email },
      data: {
        first_name: name.split(' ').slice(0, 1).join(),
        last_name: name.split(' ').slice(1).join(' '),
        email,
        dietary_preferences: dietary_preferences.split(','),
        preferred_cuisine: preferred_cuisine.split(','),
      },
    });
    return json({ success: true, message: 'Profile updated successfully.' });
  } catch (error) {
    console.error('error', error);
    return json({ error: 'An unexpected error occurred.' }, { status: 500 });
  }
};
