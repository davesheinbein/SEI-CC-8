from django.shortcuts import render

from django.http import HttpResponse
from .models import Cat

# Create your views here.
def home(request):
    return render(request, 'home.html')


def about(request):
    return render(request, 'about.html')


def cats_index(request):
    cats = Cat.objects.all()
    return render(request, 'cats/index.html', {'cats': cats})

def cats_detail(request, cat_id):
    #how to find a cat by its id?
    cat = Cat.objects.get(id=cat_id) #findById in python
    return render(request, 'cats/detail.html', {'cat': cat})
