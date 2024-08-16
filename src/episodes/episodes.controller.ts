import { ConfigService } from './../config/config.service';
import {
  Controller,
  Get,
  Post,
  Body,
  // Patch,
  Param,
  NotFoundException,
  // Delete,
} from '@nestjs/common';
import { EpisodesService } from './episodes.service';
import { CreateEpisodeDto } from './dto/create-episode.dto';
// import { UpdateEpisodeDto } from './dto/update-episode.dto';

@Controller('episodes')
export class EpisodesController {
  constructor(
    private readonly episodesService: EpisodesService,
    private readonly configService: ConfigService,
  ) {}

  @Post()
  create(@Body() createEpisodeDto: CreateEpisodeDto) {
    return this.episodesService.create(createEpisodeDto);
  }

  @Get()
  findAll() {
    return this.episodesService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const episode = await this.episodesService.findOne(id);

    if (!episode) {
      throw new NotFoundException('Episode not found');
    }

    return episode;
  }

  @Get('featured')
  findFeatured() {
    return this.episodesService.findFeatured();
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateEpisodeDto: UpdateEpisodeDto) {
  //   return this.episodesService.update(+id, updateEpisodeDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.episodesService.remove(+id);
  // }
}
