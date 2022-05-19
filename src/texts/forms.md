Forms in MST use FormProvider of React material UI.

On the below, a simple example of a React component containing a form is presented.

~~~js

// Form Validation
const NewDocumentSchema = Yup.object().shape({
    title: Yup.string().required('Title is required'), 
    body: Yup.string().required('Description is required'),
  });

    // Form Default Values
  const defaultValues = useMemo(
    () => ({
      title: currentDocument?.title || '',
      body: currentDocument?.body || '',
      isPublic: currentDocument?.isPublic || false,
    }),
    [currentDocument],
  );

  const methods = useForm({
    resolver: yupResolver(NewDocumentSchema),
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  useEffect(() => {
    if (isEdit && currentDocument) {
      reset(defaultValues);
    }
    if (!isEdit) {
      reset(defaultValues);
    }
  }, [isEdit, currentDocument]);

    // Submit action
  const onSubmit = async (values) => {
    try {
      const { body, isPublic, title } = values;
      const mutation = isEdit ? updateDocument : addDocument;
      const documentToAddOrUpdate = {
        title,
        body,
      };

      if (isEdit) {
        documentToAddOrUpdate.isPublic = isPublic;
        documentToAddOrUpdate._id = currentDocument._id;
      }

      mutation({
        variables: {
          ...documentToAddOrUpdate,
        },
        refetchQueries: [{ query: documentsQuery }],
      });
      reset();
      enqueueSnackbar(!isEdit ? 'Create success!' : 'Update success!');
      navigate(PATH_DASHBOARD.documents);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={12}>
          <Card sx={{ p: 3 }}>
            <Stack spacing={3}>
              <RHFSwitch name="isPublic" label="Public Document" />
              <RHFTextField name="title" label="Document Title" />
              <div>
                <LabelStyle>Document Content</LabelStyle>
                <RHFEditor simple name="body" />
              </div>
            </Stack>
            <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
              {!isEdit ? 'Create Product' : 'Save Changes'}
            </LoadingButton>
          </Card>
        </Grid>
      </Grid>
    </FormProvider>
  );

~~~

A few things to note: first, the Validation component from MST is being imported to add client-side validation to the form. This allows us to validate the user's input before submitting the form to ensure they've completed it properly.

In this case, when the form is submitted—assuming the user has passed the required validation—submitHandler is called which then relays the call to the handleSubmit function defined on the <span class="badge">< DocumentNewForm /></span> component, passing along the <span class="badge"> Form</span> being submitted.

Inside of handleSubmit, the presumed mutation method provided to us via GraphQL using the <span class="badge">graphql()</span> component enhancer function from the react-apollo package then makes a call to our <span class="badge">addDocument</span> mutation in our GraphQL schema.