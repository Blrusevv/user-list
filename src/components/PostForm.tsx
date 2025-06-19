import React from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Post } from '../types/Post';
import { postSchema } from '../utils/validations';
import { UserField } from '.';

interface PostFormProps {
  post?: Partial<Post>;
  onSubmit: (data: { title: string; body: string }) => void;
  onCancel?: () => void;
  loading?: boolean;
}

const PostForm: React.FC<PostFormProps> = ({ post, onSubmit, onCancel, loading }) => {
  const methods = useForm({
    defaultValues: {
      title: post?.title || '',
      body: post?.body || '',
    },
    resolver: yupResolver(postSchema),
    mode: 'onChange',
  });
  const { handleSubmit, formState, reset, watch, register } = methods;
  const watchedValues = watch();
  const isChanged = JSON.stringify(watchedValues) !== JSON.stringify({ title: post?.title || '', body: post?.body || '' });

  return (
    <FormProvider {...methods}>
      <Form className="post-form" onSubmit={handleSubmit(onSubmit)}>
        <UserField
          label="Title"
          name="title"
        />
        <Form.Floating className="mb-3 user-floating-label-group">
          <Form.Control
            as="textarea"
            id="post-body"
            placeholder="Body"
            style={{ minHeight: '120px' }}
            {...register('body')}
            isInvalid={!!formState.errors.body}
            autoComplete="off"
            disabled={loading}
          />
          <label htmlFor="post-body">Body</label>
          <Form.Control.Feedback type="invalid">
            {formState.errors.body?.message as string}
          </Form.Control.Feedback>
        </Form.Floating>
        <div className="user-details-actions">
          {onCancel && (
            <Button variant="secondary" type="button" onClick={() => { reset(); onCancel(); }} disabled={loading}>
              Cancel
            </Button>
          )}
          <Button variant="primary" type="submit" disabled={!isChanged || !formState.isValid || loading}>
            Save
          </Button>
        </div>
      </Form>
    </FormProvider>
  );
};

export default PostForm; 