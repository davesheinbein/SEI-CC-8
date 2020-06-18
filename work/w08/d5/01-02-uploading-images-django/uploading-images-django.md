<img src="https://i.imgur.com/r4VOQOq.jpg">

# Uploading Images in Django

## Learning Objectives

| Students will be able to: |
|---|
| Set up Amazon S3 to hold an app's uploaded images |
| Use an HTML `<form>` to send a file to the server |
| Upload a file to S3 from the server |

## Roadmap

1. Intro
2. Ready the Starter Code
3. Set up Amazon S3
4. Add a `Photo` Model
5. Add the `add_photo` URL
6. Add the `add_photo` View Function
7. Update the _details.html_ Template
8. Test it Out!
9. Check it Out in Admin

## Intro

Many applications we develop benefit from the ability of its users being able to upload and display images.

For example, an application that tracks a user's hikes would allow the user to upload photos of those hikes. Or better yet, our Cat Collector app can allow images to be uploaded for a cat!

This lesson will cover how to add this ability to your Django project should you choose to.

## Ready the Starter Code

This lesson's starter code picks up from the many-to-many models lesson.

If your many-to-many code is working, you can continue working with that codebase, however, it is recommended that you work with the starter code provided with this lesson.

The starter code is located in this lesson's `/starter-code/catcollector` directory.

**Be sure to be inside of the catcollector directory** before you open VS Code with `code .`.

**Be sure that no other Django server is running!**

Once inside the **catcollector** directory, spin up the Django development server:

```bash
$ python3 manage.py runserver
```

## Set up Amazon S3

AWS (Amazon Web Services) is a cloud platform offering a slew of web services such as compute power, database storage, content delivery and more.

You can see all of the services available by clicking here [Amazon AWS](https://aws.amazon.com/).

The specific web service we are going to use to host our uploaded images is the _Simple Storage Service_, better known as **Amazon S3**.

### Set up an Amazon AWS Account

Before we can use S3, or any Amazon Web Service, we'll need an Amazon AWS account.

**Notice:** Even though AWS has a "free tier" and we will do nothing in SEI that will cost money, AWS requires a credit card to open an account.  If you don't wish to provide a credit card, you will not be able to complete this lesson and you won't be able to upload images using Amazon Web Services. Unfortunately, alternative services, such as Microsoft Azure, have the same credit card requirement.

Click the orange **Sign in to the Console** button, then click **Create a new AWS account** (or browse [here](https://portal.aws.amazon.com/billing/signup#/start)):

<img src="https://i.imgur.com/dOcYjJ5.png">

Unfortunately, the signup process is a bit lengthy...

### Sign in to the AWS Console

After you have signed up, log in to the Console:

<img src="https://i.imgur.com/KOraf1L.png">

then sign in:

<img src="https://i.imgur.com/c38jT6s.png">

### Create Access ID & Secret Keys

We need to do create an **Access Key ID** and a **Secret Access Key** to access S3 with.

Click the **>  All services** drop-down:

<img src="https://i.imgur.com/wczgsIY.png">

Locate the "Security, Identity & Compliance" section and click **IAM** (Identity and Access Management):

<img src="https://i.imgur.com/2pAZLVG.png">

Click **Users** in the sidebar:

<img src="https://i.imgur.com/oyZtir7.png">

Click the blue **Add user** button:

<img src="https://i.imgur.com/HEMERzW.png">

Enter a user name for the credentials being created (your web app's name if perfect), select **Programmatic access**, then click the **Next Permissions** button:

<img src="https://i.imgur.com/sUxiveh.png">

Now we need to create a group that will have S3 permissions that the user can be assigned to.

Click the **Create group** button:

<img src="https://i.imgur.com/OVcl9N9.png">

Enter a **Group name** - `django-s3-assets` is fine.

Then search or scroll way down, select the **AmazonS3FullAccess** checkbox and click the blue **Create group** button:

<img src="https://i.imgur.com/ZcGlCxo.png">

On the following screen, ensure that the `django-s3-assets` group is selected, then click the blue **Next: Tags** button:

<img src="https://i.imgur.com/ydvoiQ8.png">

Now click the blue **Next: Review** button:

<img src="https://i.imgur.com/EWzMiOp.png">

Then finally, click the blue **Create user** button:

<img src="https://i.imgur.com/aVxeKtQ.png">

Copy both access keys to a safe place - we'll need them later in the lesson:

<img src="https://i.imgur.com/offHztR.png">

Click the **Close** button (bottom-right), but don't close the browser - on to creating an S3 bucket...

### Create an S3 Bucket for the `catcollector` App

Click the **Services** drop-down (top-left):

<img src="https://i.imgur.com/fs8ZZOs.png">

Click the `S3` link under the "Storage" section.

Buckets are containers for stuff you store in S3.

Typically, you would want to create an S3 bucket for each web application you develop that needs to use S3.

Let's click the blue **+ Create bucket** button to get started:

<img src="https://i.imgur.com/ux61Yn0.png">

You'll have to enter a globally unique **Bucket name**, then select the nearest **Region**:

<img src="https://i.imgur.com/pgQHKMB.png">

For the best performance, always be sure to select the nearest location to where your application will be hosted, e.g., Heroku.  For this lesson, be sure to select the Region nearest you.

Click the **Next** button (bottom-right of popup) - **TWICE** to get to the following screen where you want to **UNCHECK** the **Block all public access** checkbox, then **CHECK** the **I acknowledge...** checkbox:

<img src="https://i.imgur.com/gsnp6Lu.png">

Click the blue **Next** button, then a new screen will appear where you will click the blue **Create Bucket** button!

The bucket has been created!

<img src="https://i.imgur.com/2fVW2Kg.png">

However, we need to make sure that web browsers will be able to download cat images when using catcollector.

To do so, we need to specify a "bucket policy" that enables read-only access to a bucket's objects.

Click on the bucket name:

<img src="https://i.imgur.com/YxTLDyq.png">

Click the **Permissions** tab at the top:

<img src="https://i.imgur.com/HAEVb6y.png">

Click on the square **Bucket Policy** button:

<img src="https://i.imgur.com/N5gKSw0.png">

Then near the bottom click the **Policy generator** link:

<img src="https://i.imgur.com/8ZOkFY2.png">

A new tab will open in your browser.

Start entering the data as follows. BTW, that's a `*` in the "Principle" input.

<img src="https://i.imgur.com/avkZNk0.png">

This next one's a bit challenging.  In the **Amazon Resources Name (ARN)** input enter this:

`arn:aws:s3:::sei-catcollector/*`

but substitute your bucket name for `sei-catcollector`.

Click the gold **Add Statement** button.

Once that is done, click the gold **Generate Policy** button that's in Step 3.

Copy the text inside the box, including the curly braces:

<img src="https://i.imgur.com/w90Jq1x.png">

Now go back to the main tab and paste in that text:

<img src="https://i.imgur.com/38eL1gh.png">

Click the blue **Save** button (top-right).

You should see something like this at the top of the page:

<img src="https://i.imgur.com/Mn1Dl5P.png">

Congrats!  You now have an S3 bucket that, using the access keys, an application can upload files of any type to; that also allows any browser to download by using a known URL.

Now let's get on with the app!

### Install & Configure - Boto 3

#### Install `boto3`

The official Amazon AWS SDK (Software Development Kit) for Python is a library called [Boto3](https://boto3.amazonaws.com/v1/documentation/api/latest/index.html).

Let's install it:

```
$ pip3 install boto3
```

#### Configure Credentials

<p style="color:red">Don't ever put your Amazon AWS, or any other secret keys, in your source code!</p>

If you do, and push your code to GitHub, it will be discovered within minutes and could result in a major financial liability!

Have I scared you? Good...

During development (not in a deployed app), boto3 will automatically look in a special file for your AWS keys.

Let's create the folder Boto3 looks for credentials in:

```
$ mkdir ~/.aws
```

Now let's create the file where we store our credentials:

```
$ touch ~/.aws/credentials
```

Note that there is no file extension on the _credentials_ file.

Now let's open it and put our keys in there:

```
$ code ~/.aws/credentials
```

Then type the following in the file, substituting your real keys:

```
[default]
aws_access_key_id=YOUR_ACCESS_KEY
aws_secret_access_key=YOUR_SECRET_KEY
```

Note that it's possible to configure sets of credentials in addition to the `[default]` set by using _profiles_ as shown [here in the docs](https://boto3.amazonaws.com/v1/documentation/api/latest/guide/configuration.html#shared-credentials-file).

> IMPORTANT:  If you use AWS S3 in your project 3 - when deploying your projects next week, you will need to set these same keys on Heroku using `heroku config:set`, however, **the key names will need to be CAPITALIZED when setting them on Heroku**.
 
We're done with Boto3, on to the Cat Collector...

## Add a `Photo` Model

#### The Relationship

We're going to add a `Photo` Model that will hold the URL of a cat image in S3.

The relationship looks like this:  `Cat -----< Photo`<br>_A Cat has many Photos -and- A Photo belongs to a Cat_

#### Define the `Photo` Model

To the _models.py_ file we go:

```python
class Photo(models.Model):
    url = models.CharField(max_length=200)
    cat = models.ForeignKey(Cat, on_delete=models.CASCADE)

    def __str__(self):
        return f"Photo for cat_id: {self.cat_id} @{self.url}"
```

Nice and simple!

> **Reminder:** If a Model "belongs to" another Model, it must have a foreign key. More than one "belongs to" relationship - means more than one foreign key. 

<details>
	<summary>
		What needs to be done now?
	</summary>
	<p>
	<code>$ python3 manage.py makemigrations</code><br>
	<code>$ python3 manage.py migrate</code>
	</p>
</details>

## Add the `add_photo` URL

We need to add a new `path()` to the `urlpatterns` list that will match the request sent when the user submits a photo.

In _urls.py_:

```python
urlpatterns = [
	...
    path('cats/<int:pk>/delete/', views.CatDelete.as_view(), name='cats_delete'),
    path('cats/<int:cat_id>/add_feeding/', views.add_feeding, name='add_feeding'),
    # new path below
    path('cats/<int:cat_id>/add_photo/', views.add_photo, name='add_photo'),
]
```

Pretty much like the `add_feeding` route!

Notice once again, we're going to capture the cat's `id` using a URL parameter named `cat_id`.

The server currently shows an error because we've referenced an `add_photo` _view function_ that doesn't exist.  Let's take care of that next...

## Code the `add_photo` View Function

<details>
	<summary>
		Where do we define the view functions?
	</summary>
	<p><strong>views.py</strong></p>
</details>

First, we need to import three more things:

- the `boto3` library
- the `Photo` Model
- Python's `uuid` utility that will help us generate random strings

```python
# views.py

from django.shortcuts import render, redirect
from django.views.generic.edit import CreateView, UpdateView, DeleteView
from .forms import FeedingForm
# new/updated imports below
import uuid
import boto3
from .models import Cat, Toy, Photo
```

Next, we're going to define a couple of variables we'll use in the _view function_...

#### Determine the correct AWS Service Endpoint

AWS has different endpoints (URLs) dependent upon the service (S3 in our case) and geographic region.

In regards to S3, [the docs](https://docs.aws.amazon.com/general/latest/gr/s3.html) point to these endpoints for the regions nearest to our campuses:

- `https://s3.us-east-2.amazonaws.com/` (Ohio)
- `https://s3.us-west-1.amazonaws.com/` (N. California)

Pick the endpoint nearest to you and assign it to the `S3_BASE_URL` variable.  In addition, your bucket name to the `BUCKET` variable as follows:

```python
from .forms import FeedingForm

# Add these "constant" variables below the imports
S3_BASE_URL = 'https://s3-us-west-1.amazonaws.com/'
BUCKET = 'catcollector'
```

**Make sure that you use YOUR S3 bucket name instead of `catcollector`.**

Each file uploaded to S3 must have a unique URL.

We'll be using `S3_BASE_URL`, `BUCKET` and a randomly generated key to build this unique URL.

The unique URL will also be saved in the `url` attribute in each `Photo` instance.

Finally, this is where the magic happens, we'll review the code as we type it in:

```python
def add_photo(request, cat_id):
    # photo-file will be the "name" attribute on the <input type="file">
    photo_file = request.FILES.get('photo-file', None)
    if photo_file:
        s3 = boto3.client('s3')
        # need a unique "key" for S3 / needs image file extension too
        key = uuid.uuid4().hex[:6] + photo_file.name[photo_file.name.rfind('.'):]
        # just in case something goes wrong
        try:
            s3.upload_fileobj(photo_file, BUCKET, key)
            # build the full url string
            url = f"{S3_BASE_URL}{BUCKET}/{key}"
            # we can assign to cat_id or cat (if you have a cat object)
            photo = Photo(url=url, cat_id=cat_id)
            photo.save()
        except:
            print('An error occurred uploading file to S3')
    return redirect('detail', cat_id=cat_id)
```

Code like

```python
key = uuid.uuid4().hex[:6] + photo_file.name[photo_file.name.rfind('.'):]
```

is a great line of code to examine in smaller pieces within the debugger if it seems overwhelming.

On to the UI...

## Update the _details.html_ Template

We're going to need to update the _details.html_ template to:

- Display each image beneath the cat's detail "card" (left column).
- Show a "No Photos Uploaded" message if there are no images for the cat.
- Show a form below the images used to upload photos.

#### Display Cat Images

We're going to use Django's nifty `for...empty` template tags to iterate through each cat's photos like this:

```html
...
    </div>
    <!-- Insert photo markup below this comment -->
    {% for photo in cat.photo_set.all %}
      <img class="responsive-img card-panel" src="{{photo.url}}">
    {% empty %}
      <div class="card-panel teal-text center-align">No Photos Uploaded</div>
    {% endfor %}
...
```

> The `for...empty` template tags avoid having to wrap a `for...in` loop with an `if...else` like we did earlier to display a "No Toys" message.

Let's see how it looks:

<img src="https://i.imgur.com/S02DDIX.png">

Since we haven't uploaded any photos yet, we are seeing the _No Photos Uploaded_ `<div>` as expected thanks to the `{% empty %} tag`.

Reminder - we don't actually invoke methods within Django template tags.  For example, notice that there's no `()` in this line of code:

```html
{% for photo in cat.photo_set.all %}
```

This is because Django templates automatically call an attribute if it's a function. This can be a problem if you ever need to actually call a function that takes arguments.  For example, the following **will not work**:

```html
{% if len(cat.photo_set.all) > 0 %}
```

Django templates provide [filters](https://docs.djangoproject.com/en/3.0/ref/templates/builtins/#ref-templates-builtins-filters) for use in both `{{ }}` (variable) and `{% %}` (tags).

For example, to check the length, you can use the `length` filter like this:

```html
{% if cat.photo_set.all|length > 0 %}
```

Filters can also be used to transform/format data, for example, here's how the [`capfirst`](https://docs.djangoproject.com/en/3.0/ref/templates/builtins/#capfirst) filter can be used to capitalize the first letter of an outputted value:

```html
{{ some_value|capfirst }}
```

or how the [`date`](https://docs.djangoproject.com/en/3.0/ref/templates/builtins/#date) filter can be used to format dates:

```html
{{ some_date|date:"m/d/Y"}}
```

#### Form for Uploading Photos

Okay, let's code a `<form>` that we can use to upload files to the server:

```html
{% for photo in cat.photo_set.all %}
    <img class="responsive-img card-panel" src="{{photo.url}}">
{% empty %}
    <div class="card-panel teal-text center-align">No Photos Uploaded</div>
{% endfor %}

<!-- new code below -->
<form action="{% url 'add_photo' cat.id %}" enctype="multipart/form-data" method="POST" class="card-panel">
    {% csrf_token %}
    <input type="file" name="photo-file">
    <br><br>
    <input type="submit" class="btn" value="Upload Photo">
</form>
```

When using HTML forms to upload files, it's important to add the `enctype="multipart/form-data"` attribute to the `<form>` tag.

Other than `{% csrf_token %}`, it's pretty much a generic form that is typically used to upload files to any web app.

Another refresh:

<img src="https://i.imgur.com/d0FkdBW.png">

Looking good...

## Test it Out!

Try uploading your favorite cat pic.

Success!

<img src="https://i.imgur.com/lspm2S1.png">

## Check it Out in Admin

Don't forget to register the new `Photo` model so that you can use the built-in Admin app to add/edit/delete model instances.

Update the _admin.py_ file to look like this:

```python
from django.contrib import admin
# Import your models here
from .models import Cat, Feeding, Photo

# Register you models here
admin.site.register(Cat)
admin.site.register(Feeding)
admin.site.register(Photo)
```

Then browse to `localhost:8000/admin` and click through to view the added photo.

You'll see something like this:

<img src="https://i.imgur.com/IIqLuet.png">

Note how the photo's url is formed.

#### Congrats on uploading files to Amazon S3!

## Resources

[Boto 3 Docs](https://boto3.amazonaws.com/v1/documentation/api/latest/index.html)

[Django Built-in Template Tags and Filters](https://docs.djangoproject.com/en/3.0/ref/templates/builtins/#built-in-template-tags-and-filters)

