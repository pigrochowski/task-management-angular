cat > README.md << 'EOF'
# Task Management App - Angular 17+ PWA

Nowoczesna aplikacja do zarządzania zadaniami zbudowana z Angular 17+ i Material Design, z możliwością pracy offline i instalacji jako PWA.

## Funkcjonalności

- **Operacje CRUD** - Tworzenie, odczytywanie, aktualizacja i usuwanie zadań
- **Material Design** - Profesjonalny interfejs z Angular Material
- **Progressive Web App** - Możliwość instalacji z obsługą offline
- **Zaawansowane filtrowanie** - Według statusu, priorytetu i wyszukiwania tekstowego
- **System tagów** - Organizacja zadań za pomocą niestandardowych tagów
- **Terminy wykonania** - Śledzenie terminów z kalendarzem
- **Poziomy priorytetów** - System priorytetów: niski, średni, wysoki
- **Responsywny design** - Działa na komputerach i urządzeniach mobilnych

## Rozpoczęcie pracy

### Wymagania
- Node.js 18+
- Angular CLI 17+

### Instalacja

git clone https://github.com/pigrochowski/task-management-angular.git
cd task-management-angular
npm install


### Uruchomienie w trybie development
ng serve

Otwórz http://localhost:4200

### Build produkcyjny
ng build
npx http-server dist/task-management/browser -p 8080

Otwórz http://localhost:8080


## Instalacja PWA

1. Otwórz aplikację w przeglądarce Chrome/Edge
2. Poszukaj ikony instalacji (+) w pasku adresu
3. Kliknij "Instaluj" aby dodać do pulpitu/ekranu głównego
4. Korzystaj z aplikacji jak z natywnej

## Stack technologiczny

- **Angular 17+** - Framework z standalone components
- **TypeScript** - Bezpieczne typowanie
- **Angular Material** - Biblioteka komponentów UI
- **RxJS** - Programowanie reaktywne
- **PWA** - Service Worker dla trybu offline
- **SCSS** - Zaawansowane stylowanie

## Struktura projektu

src/
├── app/
│ ├── components/
│ │ ├── task-list/ # Główny komponent listy zadań
│ │ ├── task-item/ # Karta pojedynczego zadania
│ │ └── add-task-dialog/ # Dialog dodawania/edycji zadań
│ ├── services/
│ │ └── task.service.ts # Serwis zarządzania zadaniami
│ ├── models/
│ │ └── task.model.ts # Interfejsy TypeScript
│ └── app.config.ts # Konfiguracja aplikacji
├── manifest.webmanifest # Manifest PWA
└── ngsw-config.json # Konfiguracja Service Worker


## Dostępne skrypty

ng serve # Serwer development
ng build # Build produkcyjny
ng test # Uruchomienie testów
ng lint # Sprawdzanie kodu


## Autor

Piotr Grochowski
