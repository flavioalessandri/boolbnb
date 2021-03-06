@extends('layouts.main-layout')
{{-- @section('header')
  @include('partials.header2')
@endsection --}}

@section('content')

  <section id="section_show">

<div class="container">
  <div class="row justify-content-center">
    <div class="col-md-8 col-lg-8">
      {{-- <a  href="{{route('user.index')}}">Elenco appartamenti</a> --}}
      <div id="show_card" class="card mt-5 mb-5" data-card="{{$count=0}}">
        <div class="card-header">
          <h1>{{$apart -> description}}</h1>
        </div>




        <div id="card-body-show" class="card-body">

          <div class="mycarousel">
            <div class="carousel-container">

              @foreach ($apart->images as $image)
                <div class="carousel-images  @if ($count==0) active  @endif
                " data-id="{{$count++}}">

                    <img src="{{asset($image->image_path)}}" alt="{{$image->image_path}}">

                </div>

              @endforeach
              
            </div>
            
            <div class="prev"><i class="fas fa-chevron-circle-left"></i> </div>
            <div class="next"><i class="fas fa-chevron-circle-right"></i> </div>

          </div>


          <h2>Informazioni relative all'appartamento</h2>

          <table class=" apart-info table table-borderless">
          <thead>
            <tr>
            </tr>
          </thead>
          <tbody class="apartment-info">
            <tr>
              <th scope="row"><i class="fas fa-bed"></i></th>
              <td>Numero di letti: {{ $apart -> number_of_beds }}</td>
            </tr>
            <tr>
              <th scope="row"><i class="fas fa-cube"></i></th>
              <td>Numero di camere: {{ $apart -> number_of_rooms }}</td>
            </tr>
            <tr>
              <th scope="row"><i class="fas fa-toilet"></i></th>
              <td>Numero di bagni: {{ $apart -> number_of_bathrooms }}</td>
            </tr>
            <tr>
              <th scope="row"><i class="fas fa-home"></i></th>
              <td>Grandezza : {{ $apart -> square_meters }} m²</td>
            </tr>
            <tr>
              <th scope="row"><i class="fas fa-map-marker-alt"></i></th>
              <td> Indirizzo: via <span style="text-transform: capitalize;">{{$apart -> address}}</span>, <span style="text-transform: capitalize;">{{$apart -> city}}</span>, <span style="text-transform: capitalize;">{{$apart -> state}}</span></td>
            </tr>
          </tbody>
        </table>

        <div class="apartment-services-list d-flex align-items-start">
  
            <h2>Servizi aggiuntivi </h2>
              <ul class="apartment-info-services">
                @foreach ($services as $serv)
                  <li class="mb-2 d-inline-block p-2 bg-primary text-white">{{ $serv -> service }}</li>
                @endforeach
              </ul>

        </div>

          <!-- messaggi form -->

          <div class="form-messaggio">

            <div class="row">
              <div class="col-lg-12">
                  <i class=" msg-icon far fa-envelope"></i>
                  <form action="{{route('message.create')}}" method="POST" enctype="multipart/form-data" id="form_id">
                    @csrf
                    @method('POST')

                    <input class='invisible' type="text" name="apartment_id" value="{{ $apart -> id }}">
                      <div class="form-group">
                           <h5 class="text-light"><label for="email">Email</label></h5>

                          <input
                          @auth
                          value="{{$user -> email }}"
                          @endauth
                            type="email" name="email" class="form-control" tabindex="2" placeholder="Indirizzo Mail" required>
                      </div>
                      <div class="form-group">
                           <h5 class="text-light"><label for="message">Messaggio</label></h5>

                           <textarea name="message" class="form-control" tabindex="4" placeholder="Contatta il proprietario" required></textarea>
                      </div>
                      <button type="submit" name="submit" class="btn btn-primary btn-block" tabindex="5">Submit</button>
                  </form>
              </div>
          </div>

        </div>

        </div>
      </div>
      {{-- <a href="#">Statistiche</a>
      <a href="#">Sponsorizza l'appartamento</a> --}}

    </div>
  </div>
</div>


</section>

@endsection
