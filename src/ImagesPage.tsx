import { useEffect, useState } from 'react'
import {
  ArrowLeft, ChevronLeft, ChevronRight, ExternalLink, Image as ImageIcon,
  Maximize2, Play, X,
} from 'lucide-react'
import './ImagesPage.css'

type CollectionId = 'exterior' | 'coworking' | 'interiors' | 'bedrooms'
type MediaItem = {
  collection: CollectionId
  type: 'image' | 'video'
  title: string
  note: string
  src: string
}

const views: MediaItem[] = [
  {
    collection: 'exterior', type: 'image',
    title: 'Terrace estate at dusk',
    note: 'Long elevation, deep upper terrace and landscape relationship.',
    src: 'https://customer-apps-techhq.s3.eu-west-2.amazonaws.com/ahangama-design/Tropical+Terrace+Estate+at+Dusk.webp',
  },
  {
    collection: 'exterior', type: 'image',
    title: 'Resort villa at dusk',
    note: 'Arrival atmosphere, warm material palette and sheltered edges.',
    src: 'https://customer-apps-techhq.s3.eu-west-2.amazonaws.com/ahangama-design/Tropical+Resort+Villa+at+Dusk.webp',
  },
  {
    collection: 'exterior', type: 'image',
    title: 'Boutique guesthouse at golden hour',
    note: 'Guestroom rhythm, upper-level openness and tropical planting.',
    src: 'https://customer-apps-techhq.s3.eu-west-2.amazonaws.com/ahangama-design/Tropical+Boutique+Guesthouse+at+Golden+Hour.webp',
  },
  {
    collection: 'exterior', type: 'image',
    title: 'Ahangama guesthouse concept board',
    note: 'Combined exterior language, atmosphere and material direction.',
    src: 'https://customer-apps-techhq.s3.eu-west-2.amazonaws.com/ahangama-design/Ahangama+Guesthouse+Concept+Board.webp',
  },
  {
    collection: 'coworking', type: 'image',
    title: 'Coworking terrace at golden hour',
    note: 'Flexible worktables, shaded perimeter and an open relationship to the landscape.',
    src: 'https://customer-apps-techhq.s3.eu-west-2.amazonaws.com/ahangama-design/Tropical+Coworking+Terrace+at+Golden+Hour.webp',
  },
  {
    collection: 'coworking', type: 'image',
    title: 'Open-air kitchen lounge',
    note: 'Shared kitchen, informal seating and communal life across the first-floor terrace.',
    src: 'https://customer-apps-techhq.s3.eu-west-2.amazonaws.com/ahangama-design/Tropical+Open-Air+Kitchen+Lounge.webp',
  },
  {
    collection: 'coworking', type: 'video',
    title: 'Coworking space walkthrough',
    note: 'A moving overview of the open first-floor work setting and its circulation.',
    src: 'https://customer-apps-techhq.s3.eu-west-2.amazonaws.com/ahangama-design/co-working-space.mov',
  },
  {
    collection: 'coworking', type: 'video',
    title: 'Lounge and coworking space',
    note: 'The relationship between informal lounge seating and shared work positions.',
    src: 'https://customer-apps-techhq.s3.eu-west-2.amazonaws.com/ahangama-design/lounge-co-working-space.MOV',
  },
  {
    collection: 'coworking', type: 'video',
    title: 'Kitchen and coworking desk',
    note: 'Shared kitchen activity alongside the communal work desk.',
    src: 'https://customer-apps-techhq.s3.eu-west-2.amazonaws.com/ahangama-design/kitchen-co-working-desk.MOV',
  },
  {
    collection: 'coworking', type: 'video',
    title: 'Overall coworking perspective',
    note: 'A wider perspective across the full upper-floor communal arrangement.',
    src: 'https://customer-apps-techhq.s3.eu-west-2.amazonaws.com/ahangama-design/overall-presepctive-co-working-space.MOV',
  },
  {
    collection: 'coworking', type: 'video',
    title: 'Timber roof structure',
    note: 'The exposed timber roof character and shelter over the coworking floor.',
    src: 'https://customer-apps-techhq.s3.eu-west-2.amazonaws.com/ahangama-design/timber-roof-structure-co-working.MOV',
  },
  {
    collection: 'bedrooms', type: 'image',
    title: 'Bathroom and wardrobe threshold',
    note: 'The compact transition between sleeping space, wardrobe storage and the en-suite bathroom.',
    src: 'https://customer-apps-techhq.s3.eu-west-2.amazonaws.com/ahangama-design/bathroom-wardrobe.webp',
  },
  {
    collection: 'bedrooms', type: 'image',
    title: 'Shower view',
    note: 'A simple walk-in shower with restrained finishes and practical wet-area detailing.',
    src: 'https://customer-apps-techhq.s3.eu-west-2.amazonaws.com/ahangama-design/bathroom+view+shower.avif',
  },
  {
    collection: 'bedrooms', type: 'image',
    title: 'Guestroom entrance perspective',
    note: 'Arrival into the room with the bed, circulation and garden-facing opening held in one view.',
    src: 'https://customer-apps-techhq.s3.eu-west-2.amazonaws.com/ahangama-design/bedroom+entrance+2.avif',
  },
  {
    collection: 'bedrooms', type: 'image',
    title: 'Entrance and storage',
    note: 'The guestroom entry sequence and its relationship to built-in storage and the bathroom zone.',
    src: 'https://customer-apps-techhq.s3.eu-west-2.amazonaws.com/ahangama-design/bedroom+entrance.avif',
  },
  {
    collection: 'bedrooms', type: 'image',
    title: 'Guestroom interior',
    note: 'The principal sleeping space, natural material palette and shaded outlook.',
    src: 'https://customer-apps-techhq.s3.eu-west-2.amazonaws.com/ahangama-design/bedroom.avif',
  },
  {
    collection: 'bedrooms', type: 'image',
    title: 'Bedroom outlook',
    note: 'A portrait view of the sleeping area and its relationship to the tropical exterior.',
    src: 'https://customer-apps-techhq.s3.eu-west-2.amazonaws.com/ahangama-design/bedroom-view.webp',
  },
  {
    collection: 'bedrooms', type: 'image',
    title: 'En-suite bathroom',
    note: 'Compact bathroom arrangement with durable surfaces and straightforward fixtures.',
    src: 'https://customer-apps-techhq.s3.eu-west-2.amazonaws.com/ahangama-design/bathroom.avif',
  },
]

const collections = [
  { id: 'exterior' as CollectionId, label: 'Exterior views', count: 4, eyebrow: 'Exterior studies', title: <>One project,<br />four atmospheres.</> },
  { id: 'coworking' as CollectionId, label: 'First-floor coworking', count: 7, eyebrow: 'Upper communal floor', title: <>Work, cook and gather<br />above the guestrooms.</> },
  { id: 'interiors' as CollectionId, label: 'Interiors', count: 0, eyebrow: 'Interior studies', title: <>Interior studies<br />to follow.</> },
  { id: 'bedrooms' as CollectionId, label: 'Guestroom interiors', count: 7, eyebrow: 'Room interior studies', title: <>A compact room,<br />calmly resolved.</> },
] as const

export default function ImagesPage() {
  const [activeCollection, setActiveCollection] = useState<CollectionId>('exterior')
  const [activeIndex, setActiveIndex] = useState<number | null>(null)
  const collection = collections.find((item) => item.id === activeCollection)!
  const visibleViews = views.filter((view) => view.collection === activeCollection)

  useEffect(() => {
    document.title = 'Image Library — Ahangama Guesthouse'
  }, [])

  useEffect(() => {
    if (activeIndex === null) return

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setActiveIndex(null)
      if (event.key === 'ArrowLeft') setActiveIndex((current) => current === null ? null : (current - 1 + visibleViews.length) % visibleViews.length)
      if (event.key === 'ArrowRight') setActiveIndex((current) => current === null ? null : (current + 1) % visibleViews.length)
    }

    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', handleKeyDown)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [activeIndex, visibleViews.length])

  const move = (direction: -1 | 1) => {
    if (activeIndex === null) return
    setActiveIndex((activeIndex + direction + visibleViews.length) % visibleViews.length)
  }

  const selectCollection = (id: CollectionId, count: number) => {
    if (!count) return
    setActiveCollection(id)
    setActiveIndex(null)
  }

  return (
    <div className="images-page">
      <header className="images-topbar">
        <a href="/" className="images-brand"><span>AG</span><strong>Ahangama Guesthouse</strong></a>
        <div className="images-title"><span>Visual reference library</span><strong>Concept collection · October 2026</strong></div>
        <nav aria-label="Project pages"><a href="/plans">Plans</a><a href="/cost">Cost</a></nav>
        <a href="/" className="images-back"><ArrowLeft /> Concept brief</a>
      </header>

      <main>
        <section className="images-intro">
          <div className="images-intro-index">VIS / 01</div>
          <div>
            <p>{collection.eyebrow}</p>
            <h1>{collection.title}</h1>
          </div>
          <div className="images-intro-note">
            <ImageIcon />
            <p>Concept imagery for architectural direction and consultant discussion. These views are not technical evidence and do not override the drawings.</p>
          </div>
        </section>

        <section className="collection-nav" aria-label="Image collections">
          {collections.map((item) => (
            <button className={activeCollection === item.id ? 'active' : ''} disabled={!item.count} onClick={() => selectCollection(item.id, item.count)} key={item.id}>
              <span>{item.label}</span><strong>{String(item.count).padStart(2, '0')}</strong>{!item.count && <small>To follow</small>}
            </button>
          ))}
        </section>

        <section className="image-grid" aria-label={`${collection.label} concept media`}>
          {visibleViews.map((view, index) => (
            <article className={`image-card image-card-${index + 1}`} key={view.title}>
              <button onClick={() => setActiveIndex(index)} aria-label={`${view.type === 'video' ? 'Play' : 'Enlarge'} ${view.title}`}>
                {view.type === 'image'
                  ? <img src={view.src} alt={`${view.title}, ${collection.label.toLowerCase()} concept study for the Ahangama guesthouse`} loading={index === 0 ? 'eager' : 'lazy'} />
                  : <span className="film-preview" aria-hidden="true"><Play /><small>Concept film</small></span>}
                <span>{view.type === 'video' ? <Play /> : <Maximize2 />} {view.type === 'video' ? 'Play film' : 'View full image'}</span>
              </button>
              <div className="image-meta">
                <span>{String(index + 1).padStart(2, '0')} / {view.type === 'video' ? 'Film' : collection.label}</span>
                <h2>{view.title}</h2>
                <p>{view.note}</p>
              </div>
            </article>
          ))}
        </section>

        <section className="future-collection">
          <span>Next collection</span>
          <h2>Shared interiors<br />to follow.</h2>
          <p>The library is structured to grow as new visual studies are approved.</p>
        </section>
      </main>

      {activeIndex !== null && (
        <div className="image-lightbox" role="dialog" aria-modal="true" aria-label={`${visibleViews[activeIndex].title} full image`}>
          <header>
            <div><span>{String(activeIndex + 1).padStart(2, '0')} / {String(visibleViews.length).padStart(2, '0')}</span><strong>{visibleViews[activeIndex].title}</strong></div>
            <a href={visibleViews[activeIndex].src} target="_blank" rel="noreferrer">Open original <ExternalLink /></a>
            <button onClick={() => setActiveIndex(null)} aria-label="Close full image"><X /></button>
          </header>
          <div className="lightbox-stage">
            <button onClick={() => move(-1)} aria-label="Previous media"><ChevronLeft /></button>
            {visibleViews[activeIndex].type === 'image'
              ? <img src={visibleViews[activeIndex].src} alt={`${visibleViews[activeIndex].title}, ${collection.label.toLowerCase()} concept study`} />
              : <video key={visibleViews[activeIndex].src} src={visibleViews[activeIndex].src} controls autoPlay playsInline preload="metadata" aria-label={`${visibleViews[activeIndex].title} film`} />}
            <button onClick={() => move(1)} aria-label="Next media"><ChevronRight /></button>
          </div>
          <footer><span>Visual study · not technical evidence</span><p>{visibleViews[activeIndex].note}</p></footer>
        </div>
      )}
    </div>
  )
}
