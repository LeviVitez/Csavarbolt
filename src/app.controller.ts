import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Render,
} from '@nestjs/common';
import { get } from 'http';
import { DataSource } from 'typeorm';
import { AppService } from './app.service';
import { Csavar } from './csavarAdat';
import { Rendeles } from './rendelesAdat';

@Controller()
export class AppController {
  getHello(): any {
    throw new Error('Method not implemented.');
  }
  constructor(
    private readonly appService: AppService,
    private dataSource: DataSource,
  ) {}

  @Get()
  @Render('index')
  index() {
    return { message: 'Welcome to the homepage' };
  }

  @Get('api/csavarbolt')
  async listCsavar() {
    const csavarRepo = this.dataSource.getRepository(Csavar);
    return await csavarRepo.find();
  }

  @Post('api/csavarbolt')
  newCsavar(@Body() csavar: Csavar) {
    csavar.id = undefined;
    const csavarRepo = this.dataSource.getRepository(Csavar);
    csavarRepo.save(csavar);
  }

  @Delete('api/csavarbolt/:id')
  deleteCsavar(@Param('id') id: number) {
    const csavarRepo = this.dataSource.getRepository(Csavar);
    csavarRepo.delete(id);
  }

  @Post('api/csavarbolt/:id/rendeles')
  async rendelesCsavar(
    @Body() rendeles: Rendeles,
    @Param('id') csavarId: number,
  ) {
    const rendelesRepo = this.dataSource.getRepository(Rendeles);
    rendeles.id = undefined;
    rendeles.csavar_id = csavarId;

    const csavarRepo = this.dataSource.getRepository(Csavar);
    const rendeltCsavar = await csavarRepo.findOneBy({ id: csavarId });
    rendeltCsavar.keszlet = rendeltCsavar.keszlet - rendeles.db;
    console.log(rendeltCsavar.ar * rendeles.db);
    csavarRepo.save(rendeltCsavar);
    rendelesRepo.save(rendeles);
  }

  @Get('api/csavarbolt/rendeles')
  async listRendeles() {
    const rendelesRepo = this.dataSource.getRepository(Rendeles);
    return await rendelesRepo.find();
  }

  @Delete('api/csavarbolt/rendeles/:id')
  deleteRendeles(@Param('id') id: number) {
    const rendelesRepo = this.dataSource.getRepository(Rendeles);
    rendelesRepo.delete(id);
  }
}