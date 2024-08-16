import { Injectable } from '@nestjs/common';
import { CreateEpisodeDto } from './dto/create-episode.dto';
// import { UpdateEpisodeDto } from './dto/update-episode.dto';
import { Episode } from './entities/episode.entity';
import { randomUUID } from 'crypto';

@Injectable()
export class EpisodesService {
  private episodes: Episode[] = [];

  async create(createEpisodeDto: CreateEpisodeDto) {
    const newEpisode = { ...createEpisodeDto, id: randomUUID() };
    this.episodes.push(newEpisode);

    return newEpisode;
  }

  async findAll(sort: 'asc' | 'desc' = 'asc') {
    const sortAsc = (a: Episode, b: Episode) => (a.name > b.name ? 1 : -1);
    const sortDesc = (a: Episode, b: Episode) => (a.name < b.name ? 1 : -1);

    return sort === 'asc'
      ? this.episodes.sort(sortAsc)
      : this.episodes.sort(sortDesc);
  }

  async findOne(id: string) {
    return this.episodes.find((episode) => episode.id === id);
  }

  async findFeatured() {
    return this.episodes.filter((episode) => episode.featured);
  }

  // update(id: number, updateEpisodeDto: UpdateEpisodeDto) {
  //   return `This action updates a #${id} episode`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} episode`;
  // }
}
